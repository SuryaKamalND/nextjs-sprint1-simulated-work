// Server Component (no 'use client'): static nav rendered on the server.
// Only the ThemeToggle leaf inside it is a Client Component.
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
      {/* Interactive leaf */}
      <ThemeToggle />
    </header>
  );
}
