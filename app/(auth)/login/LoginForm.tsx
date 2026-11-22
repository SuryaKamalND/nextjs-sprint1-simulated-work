"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const input = { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" } as const;

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.currentTarget);
    // Sends the credentials to NextAuth's credentials callback (authorize() runs on the server).
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setPending(false);
    if (res?.error) {
      setError("Invalid email or password."); // same message for both cases - don't reveal which was wrong
      return;
    }
    router.push(params.get("callbackUrl") ?? "/me");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      {params.get("registered") && <p style={{ color: "#16a34a" }}>Account created - please sign in.</p>}
      <input name="email" type="email" placeholder="you@example.com" style={input} />
      <input name="password" type="password" placeholder="Password" style={input} />
      {error && <p style={{ color: "#dc2626" }}>{error}</p>}
      <button
        type="submit"
        disabled={pending}
        style={{ width: "100%", padding: "0.5rem", background: "#0f172a", color: "white", border: 0, borderRadius: "6px" }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
