import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  
  // Define paths
  const publicPaths = ['/admin/login', '/admin/register', '/admin/dashboard'];
  const isPublicPath = publicPaths.includes(path);
  const isAdminPath = path.startsWith('/admin');

  // Handle public paths (login, register)
  if (isPublicPath) {
    if (token) {
      try {
        await verifyAuth(token);
        // If token is valid and user is on login page, redirect to dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (error) {
        // If token is invalid, clear it and continue to login
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
    }
    return NextResponse.next();
  }

  // Handle protected admin routes
  if (isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await verifyAuth(token);
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, clear token and redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};