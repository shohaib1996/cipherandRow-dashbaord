import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookie
  const authToken = request.cookies.get('auth_token')?.value;

  // Public routes that don't require authentication
  const publicRoutes = ['/signin', '/signup', '/privacy', '/refund', '/security', '/terms', '/sentry-example-page'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If user is not authenticated and trying to access protected route
  if (!authToken && !isPublicRoute) {
    const signinUrl = new URL('/signin', request.url);
    return NextResponse.redirect(signinUrl);
  }

  // If user is authenticated and trying to access signin/signup, redirect to dashboard
  if (authToken && (pathname === '/signin' || pathname === '/signup')) {
    const dashboardUrl = new URL('/dashboard/overview', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sentry
     * - public files (png, jpg, svg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sentry-example-page|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
  ],
}
