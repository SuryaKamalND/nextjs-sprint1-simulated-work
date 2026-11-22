"use client";

// Makes the session available to Client Components via useSession().
// Server Components don't need this - they call getServerSession() directly.
import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
