"use client";

// The form calls the Server Action through its `action` prop. useActionState (React 19's
// name for the older useFormState) gives us the state the action returned + a pending flag.
import { useActionState } from "react";
import { submitFeedback, type FeedbackState } from "./actions";

const initialState: FeedbackState = { status: "idle" };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <span style={{ color: "#dc2626", fontSize: "0.85rem" }}>{errors[0]}</span>;
}

export default function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(submitFeedback, initialState);
  const v = state.values;

  return (
    // key changes after a success, so React remounts the form and clears the inputs.
    <form
      key={state.status === "success" ? state.message : "form"}
      action={formAction}
      noValidate
      style={{ display: "grid", gap: "0.5rem", maxWidth: "420px" }}
    >
      <input name="name" placeholder="Your name" defaultValue={v?.name} style={{ padding: "0.5rem" }} />
      <FieldError errors={state.fieldErrors?.name} />

      <input name="email" type="email" placeholder="you@example.com" defaultValue={v?.email} style={{ padding: "0.5rem" }} />
      <FieldError errors={state.fieldErrors?.email} />

      <textarea name="message" placeholder="Your feedback" rows={3} defaultValue={v?.message} style={{ padding: "0.5rem" }} />
      <FieldError errors={state.fieldErrors?.message} />

      <button type="submit" disabled={isPending} style={{ padding: "0.5rem 1rem" }}>
        {isPending ? "Sending…" : "Send feedback"}
      </button>

      {state.message && (
        <p role="status" style={{ color: state.status === "success" ? "#16a34a" : "#dc2626" }}>
          {state.message}
        </p>
      )}
    </form>
  );
}
