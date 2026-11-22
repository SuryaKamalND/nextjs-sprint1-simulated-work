// Type the extra fields we put into the JWT and expose on session.user.
import type { DefaultSession } from "next-auth";
import type { Role } from "@/lib/auth-users";

declare module "next-auth" {
  interface Session {
    user: { id: string; role: Role } & DefaultSession["user"];
  }
  interface User {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}
