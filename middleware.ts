import { NextRequest, NextResponse } from 'next/server';

const AUTH_REQUIRED_PATHS = ['mypage', 'logout', 'chat'];

export default async function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get(process.env.NEXTAUTH_SESSION!);
  const isAuthRequired = AUTH_REQUIRED_PATHS.some((authPath) =>
    req.url.includes(authPath)
  );

  if (isAuthenticated && !isAuthRequired) {
    return NextResponse.redirect(new URL('/mypage', req.url));
  }
  if (!isAuthenticated && isAuthRequired) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
