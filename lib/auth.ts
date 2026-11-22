// NextAuth configuration shared by the API route and getServerSession().
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyCredentials } from "@/lib/auth-users";

// Google OAuth is enabled only when both credentials are present in the environment
// (.env.local locally, the host's secret settings in production). Never hard-code them.
export const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
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
        return { id: user.id, name: user.name, email: user.email }; // no password hash leaves this function
      },
    }),
  ],
};
