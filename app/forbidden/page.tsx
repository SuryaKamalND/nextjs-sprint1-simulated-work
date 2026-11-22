// app/forbidden/page.tsx - shown (with HTTP 403) by middleware when the user is
// signed in but their role isn't allowed on the page they requested.
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", margin: "1rem 0" }}>403</h1>
      <h2>Access denied</h2>
      <p>You&apos;re signed in, but your account doesn&apos;t have permission to view this page.</p>
      <Link href="/me">← Back to your account</Link>
    </main>
  );
}
