import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (100 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitInfo = rateLimitMap.get(ip);

  if (!limitInfo || now > limitInfo.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 });
    return true;
  }

  if (limitInfo.count >= 100) {
    return false;
  }

  limitInfo.count += 1;
  return true;
}

export async function validateAdminRequest(req: Request) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  if (!checkRateLimit(ip)) {
    return { error: 'Too many requests', status: 429, supabase: null, user: null };
  }

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized', status: 401, supabase: null, user: null };
  }

  // Double check whitelist
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  if (!session.user.email || !adminEmails.includes(session.user.email)) {
    return { error: 'Unauthorized email', status: 403, supabase: null, user: null };
  }

  return { error: null, status: 200, supabase, user: session.user };
}

export async function logAdminActivity(
  supabase: any,
  userEmail: string,
  action: string,
  targetType: string,
  targetId?: string,
  ipAddress?: string
) {
  try {
    await supabase.from('admin_activity_logs').insert({
      user_email: userEmail,
      action,
      target_type: targetType,
      target_id: targetId,
      ip_address: ipAddress || 'unknown'
    });
  } catch (err) {
    console.error('Failed to log admin activity:', err);
  }
}
