"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  order_number: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  preferred_contact: z.string().optional(),
  // Honeypot field - must be empty
  website: z.string().max(0, "Bot detected").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SUBJECT_OPTIONS = [
  "Order Inquiry",
  "Product Question",
  "Returns & Exchanges",
  "Collaboration",
  "Partnership",
  "Wholesale",
  "Feedback",
  "Other"
];

const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"];

export function ContactFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      subject: "",
      order_number: "",
      message: "",
      preferred_contact: "Email",
      website: "", // honeypot
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Something went wrong.");
      }

      setSubmitStatus("success");
      reset(); // Clear form on success
    } catch (error: any) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="w-full bg-[#141414] border border-[#1E1E1E] p-10 md:p-16 flex flex-col items-center justify-center text-center rounded-sm animate-[fadeIn_0.5s_ease-out]">
        <div className="w-20 h-20 bg-[#C4622D]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 strokeWidth={1.5} className="w-10 h-10 text-[#C4622D]" />
        </div>
        <h3 className="font-display text-[32px] text-[#F5F0E8] tracking-widest uppercase mb-4">
          Message Sent!
        </h3>
        <p className="font-serif text-[#8A9A9E] text-[18px] max-w-md mx-auto mb-8">
          Thank you for reaching out to OWL FAMILY. We've received your message and will get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="font-mono text-[11px] text-[#C4622D] uppercase tracking-[0.2em] border border-[#C4622D] px-8 py-3 hover:bg-[#C4622D] hover:text-[#F5F0E8] transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#141414] border border-[#1E1E1E] p-8 md:p-12 rounded-sm">
      <div className="mb-10">
        <h3 className="font-display text-[28px] text-[#F5F0E8] tracking-widest uppercase mb-2">
          Send a Message
        </h3>
        <p className="font-serif text-[#8A9A9E] text-[16px]">
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Honeypot Field - Hidden from users */}
        <div className="hidden" aria-hidden="true">
          <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
              Full Name *
            </label>
            <input
              id="full_name"
              {...register("full_name")}
              disabled={isSubmitting}
              placeholder="Your full name"
              className={cn(
                "w-full bg-[#1A1A1A] border text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors",
                errors.full_name ? "border-red-500/50" : "border-[#333] focus:border-[#C4622D]"
              )}
            />
            {errors.full_name && (
              <span className="font-mono text-[10px] text-red-400">{errors.full_name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              disabled={isSubmitting}
              placeholder="you@example.com"
              className={cn(
                "w-full bg-[#1A1A1A] border text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors",
                errors.email ? "border-red-500/50" : "border-[#333] focus:border-[#C4622D]"
              )}
            />
            {errors.email && (
              <span className="font-mono text-[10px] text-red-400">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              disabled={isSubmitting}
              placeholder="+234 801 234 5678"
              className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C4622D] text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors"
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="flex flex-col gap-2">
            <label htmlFor="preferred_contact" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
              Preferred Contact
            </label>
            <div className="relative">
              <select
                id="preferred_contact"
                {...register("preferred_contact")}
                disabled={isSubmitting}
                className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C4622D] text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors appearance-none cursor-pointer"
              >
                {CONTACT_METHODS.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A9A9E]">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
              Subject *
            </label>
            <div className="relative">
              <select
                id="subject"
                {...register("subject")}
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-[#1A1A1A] border text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors appearance-none cursor-pointer",
                  errors.subject ? "border-red-500/50" : "border-[#333] focus:border-[#C4622D]"
                )}
              >
                <option value="">Select a topic...</option>
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A9A9E]">
                ▼
              </div>
            </div>
            {errors.subject && (
              <span className="font-mono text-[10px] text-red-400">{errors.subject.message}</span>
            )}
          </div>

          {/* Order Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="order_number" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
              Order Number (Optional)
            </label>
            <input
              id="order_number"
              {...register("order_number")}
              disabled={isSubmitting}
              placeholder="e.g., OWL-12345"
              className="w-full bg-[#1A1A1A] border border-[#333] focus:border-[#C4622D] text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-mono text-[11px] text-[#E8E0D0] uppercase tracking-widest">
            Message *
          </label>
          <textarea
            id="message"
            {...register("message")}
            disabled={isSubmitting}
            placeholder="Tell us how we can help you..."
            rows={6}
            className={cn(
              "w-full bg-[#1A1A1A] border text-[#F5F0E8] font-mono text-[13px] p-4 outline-none transition-colors resize-y min-h-[120px]",
              errors.message ? "border-red-500/50" : "border-[#333] focus:border-[#C4622D]"
            )}
          />
          {errors.message && (
            <span className="font-mono text-[10px] text-red-400">{errors.message.message}</span>
          )}
        </div>

        {/* Error Alert */}
        {submitStatus === "error" && (
          <div className="w-full bg-red-500/10 border border-red-500/30 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="font-mono text-[12px] text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full bg-[#C4622D] hover:bg-[#A65326] text-[#F5F0E8] font-mono text-[13px] uppercase tracking-widest p-4 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
