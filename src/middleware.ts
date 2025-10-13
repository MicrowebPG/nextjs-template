import { getCookieCache } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const ROUTES_CONFIG = {
  public: ['/login', 'api/auth'],
  protected: ['/', '/dashboard'],
  admin: ['/admin'],
  redirectAfterLogin: '/',
  redirectAfterLogout: '/login',
};

export async function middleware(request: NextRequest) {
  const session = await getCookieCache(request);
  const userRole = session?.user?.role;

  const { pathname } = request.nextUrl;

  const match = (routes: string[]) => routes.some((r) => pathname.startsWith(r));

  if ((match(ROUTES_CONFIG.protected) || match(ROUTES_CONFIG.admin)) && !session) {
    return NextResponse.redirect(new URL(ROUTES_CONFIG.redirectAfterLogout, request.url));
  }

  if (match(ROUTES_CONFIG.admin) && !['ADMIN', 'DEVELOPER'].includes(userRole ?? '')) {
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
