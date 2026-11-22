// middleware.ts (project root) - runs on the server BEFORE a matched request is
// routed/rendered, at the edge of the request cycle. If the visitor has no valid
// session token, they're redirected to /login and the protected page never renders.
// Role-restricted paths (see lib/rbac.ts) additionally get a 403 for the wrong role.
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { hasRole, requiredRolesFor } from "@/lib/rbac";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Decrypts/validates the NextAuth session cookie (JWT) - no database call.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isApi = pathname.startsWith("/api/");

  if (!token) {
    if (isApi) {
      return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Sign in required" } }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    // Remember where they were going so login can send them back afterwards.
    loginUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // RBAC: the role comes from the JWT (put there by the jwt() callback in lib/auth.ts).
  const allowed = requiredRolesFor(pathname);
  if (allowed && !hasRole(token.role, allowed)) {
    if (isApi) {
      return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Admins only" } }, { status: 403 });
    }
    // Show the 403 page at the same URL, with a real 403 status code.
    return NextResponse.rewrite(new URL("/forbidden", req.url), { status: 403 });
  }

  // Authenticated (and allowed): let the request continue untouched.
  return NextResponse.next();
}

// Only these routes run the middleware. Everything else (/, /about, /blog, /login,
// /api/auth/*, static files...) is never even checked.
export const config = {
  matcher: ["/dashboard/:path*", "/me", "/account/:path*", "/admin/:path*", "/api/admin/:path*"],
};
