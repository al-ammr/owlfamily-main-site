import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    
    // Redirect to sign-in
    return NextResponse.redirect(new URL('/admin/sign-in', request.url))
  } catch (error) {
    console.error('Sign-out error:', error)
    return NextResponse.redirect(new URL('/admin/sign-in', request.url))
  }
}
