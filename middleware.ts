// middleware.ts (project root) - runs on the server BEFORE a matched request is
// routed/rendered, at the edge of the request cycle. If the visitor has no valid
// session token, they're redirected to /login and the protected page never renders.
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Decrypts/validates the NextAuth session cookie (JWT) - no database call.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    // Remember where they were going so login can send them back afterwards.
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated: let the request continue untouched.
  return NextResponse.next();
}

// Only these routes run the middleware. Everything else (/, /about, /blog, /login,
// /api/auth/*, static files...) is never even checked.
export const config = {
  matcher: ["/dashboard/:path*", "/me", "/account/:path*"],
};
