"use client";

import { useActionState } from "react";
import { signUp, type SignUpState } from "./actions";

const input = { width: "100%", padding: "0.5rem", marginBottom: "0.25rem" } as const;
const err = { color: "#dc2626", fontSize: "0.8rem", display: "block", marginBottom: "0.5rem" } as const;

export default function RegisterForm() {
  const [state, action, pending] = useActionState<SignUpState, FormData>(signUp, {});

  return (
    <form action={action} noValidate>
      <input name="name" placeholder="Your name" style={input} />
      <span style={err}>{state.fieldErrors?.name?.[0]}</span>
      <input name="email" type="email" placeholder="you@example.com" style={input} />
      <span style={err}>{state.fieldErrors?.email?.[0]}</span>
      <input name="password" type="password" placeholder="Choose a password (8+ chars)" style={input} />
      <span style={err}>{state.fieldErrors?.password?.[0]}</span>
      {state.error && <p style={err}>{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        style={{ width: "100%", padding: "0.5rem", background: "#0f172a", color: "white", border: 0, borderRadius: "6px" }}
      >
        {pending ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}
