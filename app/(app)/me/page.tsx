// app/(app)/me/page.tsx  ->  /me
// Server Component: reads the session on the server with getServerSession.
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
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
    <section style={{ padding: "1.5rem" }}>
      <h1>Signed in as {session.user.name}</h1>
      <p>{session.user.email}</p>
      <SignOutButton />
    </section>
  );
}
