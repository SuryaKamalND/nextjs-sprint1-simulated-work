"use client";

import { signIn } from "next-auth/react";

// Starts the OAuth redirect to Google; after consent Google sends the user back to
// /api/auth/callback/google and NextAuth forwards them to callbackUrl.
export default function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/me" })}
      style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", background: "white", color: "#111" }}
    >
      Continue with Google
    </button>
  );
}
