"use client";

// Reads the same session from a Client Component (via the SessionProvider in the root layout).
import { useSession } from "next-auth/react";

export default function ClientSessionBadge() {
  const { data: session, status } = useSession();

  return (
    <p style={{ padding: "0.5rem", border: "1px dashed #888", display: "inline-block" }}>
      Client Component sees: <strong>{status}</strong>
      {session?.user ? ` as ${session.user.email}` : ""}
    </p>
  );
}
