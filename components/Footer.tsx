// Server Component (no 'use client'): static footer text rendered on the server.
// Only the CounterButton leaf inside it is a Client Component.
import CounterButton from "./CounterButton";

export function Footer() {
  return (
    <footer style={{ padding: "1rem", borderTop: "1px solid #e5e7eb", display: "flex", gap: "1rem", alignItems: "center" }}>
      <p>© 2026 Our Product · Static footer content</p>
      {/* Interactive leaf */}
      <CounterButton />
    </footer>
  );
}
