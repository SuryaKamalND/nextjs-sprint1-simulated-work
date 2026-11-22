// app/(app)/me/page.tsx  ->  /me
// Server Component: reads the session on the server with getServerSession.
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import ClientSessionBadge from "./ClientSessionBadge";
import SignOutButton from "./SignOutButton";

export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <section style={{ padding: "1.5rem" }}>
        <h1>Not signed in</h1>
        <Link href="/login">Sign in</Link>
      </section>
    );
  }

  return (
    <section style={{ padding: "1.5rem", display: "grid", gap: "0.75rem", justifyItems: "start" }}>
      <h1>Signed in as {session.user.name}</h1>
      <p>Server Component sees: {session.user.email}</p>
      <p>
        From the JWT: id <code>{session.user.id}</code> · role <code>{session.user.role}</code>
      </p>
      <ClientSessionBadge />
      <SignOutButton />
    </section>
  );
}
