// NextAuth configuration shared by the API route and getServerSession().
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCredentials } from "@/lib/auth-users";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
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
