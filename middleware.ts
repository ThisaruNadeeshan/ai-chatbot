import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex, isDevelopmentEnvironment } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    // Redirect to login if no token (not authenticated)
    if (pathname !== "/login" && pathname !== "/register") {
      const redirectUrl = encodeURIComponent(request.url);
      return NextResponse.redirect(
        new URL(`/login?redirectUrl=${redirectUrl}`, request.url)
      );
    }
    return NextResponse.next();
  }

  const isGuest = guestRegex.test(token?.email ?? "");

  // Block guest users from accessing chat pages - redirect to login
  if (isGuest && (pathname === "/" || pathname.startsWith("/chat"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated non-guest users away from login/register pages
  if (token && !isGuest && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

