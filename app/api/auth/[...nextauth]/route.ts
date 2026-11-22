// app/api/auth/[...nextauth]/route.ts - NextAuth's endpoints (/api/auth/signin,
// /api/auth/callback/credentials, /api/auth/session, /api/auth/signout, ...).
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
