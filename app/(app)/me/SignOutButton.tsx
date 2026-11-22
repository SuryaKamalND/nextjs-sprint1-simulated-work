"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })} style={{ padding: "0.5rem 1rem" }}>
      Sign out
    </button>
  );
}
