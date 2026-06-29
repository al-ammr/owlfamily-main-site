import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { generateAdminEmailHtml, generateAutoReplyHtml } from "@/emails/contactEmailTemplates";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  order_number: z.string().optional(),
  message: z.string().min(10).max(2000),
  preferred_contact: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

// Simple in-memory rate limiting (IP -> timestamps array)
// Note: In a real production deployment on Edge/Serverless, memory is ephemeral.
// A Redis solution like Upstash is recommended for robust rate limiting.
const rateLimitCache = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const timestamps = rateLimitCache.get(ip) || [];
    const validTimestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);
    
    if (validTimestamps.length >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    
    validTimestamps.push(now);
    rateLimitCache.set(ip, validTimestamps);

    // 2. Parse Body
    const body = await req.json();

    // 3. Validate Payload
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.issues },
        { status: 400 }
      );
    }

    const data = result.data;

    // 4. Honeypot Check (Spam protection)
    if (data.website && data.website.length > 0) {
      // Act like it succeeded to fool bots
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 5. Send Emails via Resend
    const adminEmail = process.env.CONTACT_EMAIL_TO || "info.owlfamily@gmail.com";
    const fromEmail = process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev";

    // A. Send to Admin
    const adminRes = await resend.emails.send({
      from: `OWL FAMILY Contact <${fromEmail}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `New Inquiry: ${data.subject} - ${data.full_name}`,
      html: generateAdminEmailHtml(data),
    });

    if (adminRes.error) {
      console.error("Resend Admin Error:", adminRes.error);
      throw new Error("Failed to send admin notification email.");
    }

    // B. Send Auto-Reply to User
    const userRes = await resend.emails.send({
      from: `OWL FAMILY Support <${fromEmail}>`,
      to: data.email,
      subject: "We received your message | OWL FAMILY",
      html: generateAutoReplyHtml(data),
    });

    if (userRes.error) {
      console.error("Resend Auto-Reply Error:", userRes.error);
      // We don't throw here so the user still sees success if admin email sent
    }

    // 6. Success Response
    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
