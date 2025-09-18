import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const ROUTES_CONFIG = {
  public: ['/login', 'api/auth'],
  protected: ['/', '/dashboard'],
  admin: ['/admin'],
  redirectAfterLogin: '/',
  redirectAfterLogout: '/login',
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === 'production'
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token',
  });

  const { pathname } = request.nextUrl;

  const match = (routes: string[]) => routes.some((r) => pathname.startsWith(r));

  if ((match(ROUTES_CONFIG.protected) || match(ROUTES_CONFIG.admin)) && !token) {
    return NextResponse.redirect(new URL(ROUTES_CONFIG.redirectAfterLogout, request.url));
  }

  if (match(ROUTES_CONFIG.admin) && !['ADMIN', 'DEVELOPER'].includes(token?.role ?? '')) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protegge tutto tranne:
     * - /api/auth/*                              (Auth API routes)
     * - /login                                   (Public page)
     * - _next/static, _next/image, favicon.ico   (Static assets)
     * - manifest.json, sw.js, pwa-icons          (PWA files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|manifest.json|pwa-icons|sw.js|offline).*)',
  ],
};
