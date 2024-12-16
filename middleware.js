import { NextResponse } from 'next/server'

const protectedPaths = ['/dashboard', '/settings', '/profile']
const authPaths = ['/login', '/signup', '/forgot-password', '/verify-email']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken')?.value
  
  // Handle protected routes
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Handle auth routes
  if (authPaths.includes(pathname)) {
    if (authToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Handle root path
  if (pathname === '/') {
    if (authToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
    '/settings/:path*',
    '/profile/:path*'
  ]
} 