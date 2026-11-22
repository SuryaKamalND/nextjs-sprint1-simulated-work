// NextAuth configuration shared by the API route and getServerSession().
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";
import { verifyCredentials } from "@/lib/auth-users";

// Google OAuth is enabled only when both credentials are present in the environment
// (.env.local locally, the host's secret settings in production). Never hard-code them.
export const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

const isProd = process.env.NODE_ENV === "production";
const EIGHT_HOURS = 8 * 60 * 60;

export const authOptions: NextAuthOptions = {
  // From the validated env module - the app refuses to start without it.
  secret: env.auth.secret,

  // JWT sessions: the session lives in an encrypted cookie, no session table needed.
  session: {
    strategy: "jwt",
    maxAge: EIGHT_HOURS, // the token expires 8 h after it was last refreshed
    updateAge: 60 * 60, // re-issue (rotate) the cookie at most once an hour while active
  },

  // Explicit cookie flags (NextAuth's defaults, spelled out so they're reviewable):
  cookies: {
    sessionToken: {
      name: isProd ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true, // JavaScript in the page can't read it (XSS can't steal the token)
        sameSite: "lax", // not sent on cross-site POSTs (CSRF protection)
        path: "/",
        secure: isProd, // HTTPS-only in production (localhost dev runs on http)
      },
    },
  },

  callbacks: {
    // Runs when the JWT is created (sign-in) and whenever it's read/refreshed.
    // Only small, non-secret, rarely-changing fields go in here.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }
      return token;
    },
    // Shapes what the app sees as session.user (server and client).
    async session({ session, token }) {
      session.user.id = token.id ?? token.sub ?? "";
      session.user.role = token.role ?? "user";
      return session;
    },
  },

  pages: { signIn: "/login" },
  providers: [
    // OAuth flow: our app redirects to Google -> user consents on Google's page ->
    // Google redirects back to /api/auth/callback/google with a code -> NextAuth
    // exchanges it for the user's profile and creates our session.
    ...(googleEnabled
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Runs on the server when someone signs in with email + password.
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await verifyCredentials(credentials.email, credentials.password);
        if (!user) return null; // -> sign-in fails with "CredentialsSignin"
        // No password hash leaves this function; role is copied into the JWT by the jwt() callback.
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
};
