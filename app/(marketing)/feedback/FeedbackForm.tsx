"use client";

// The form calls the Server Action through its `action` prop. useActionState gives us
// the value the action returned plus a pending flag - still no manual fetch().
import { useActionState } from "react";
import { submitFeedback, type FeedbackResult } from "./actions";

export default function FeedbackForm() {
  const [result, formAction, isPending] = useActionState<FeedbackResult, FormData>(submitFeedback, null);

  return (
    <form action={formAction} style={{ display: "grid", gap: "0.75rem", maxWidth: "420px" }}>
      <input name="name" placeholder="Your name" style={{ padding: "0.5rem" }} />
      <textarea name="message" placeholder="Your feedback" rows={3} style={{ padding: "0.5rem" }} />
      <button type="submit" disabled={isPending} style={{ padding: "0.5rem 1rem" }}>
        {isPending ? "Sending…" : "Send feedback"}
      </button>
      {result && (
        <p role="status" style={{ color: result.ok ? "#16a34a" : "#dc2626" }}>
          {result.message}
        </p>
      )}
    </form>
  );
}
