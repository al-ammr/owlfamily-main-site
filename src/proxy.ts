import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute   = request.nextUrl.pathname.startsWith('/admin')
  const isSignInPage   = request.nextUrl.pathname === '/admin/sign-in'
  const isApiRoute     = request.nextUrl.pathname.startsWith('/api/admin')

  // Protect all admin routes except sign-in
  if (isAdminRoute && !isSignInPage && !user) {
    return NextResponse.redirect(new URL('/admin/sign-in', request.url))
  }
  
  // Redirect logged-in users away from sign-in page
  if (isSignInPage && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // API route protection
  if (isApiRoute && !request.nextUrl.pathname.startsWith('/api/admin/auth/sign-in') && !user) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
