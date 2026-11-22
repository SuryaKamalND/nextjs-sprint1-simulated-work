"use server";

// Every export of a 'use server' file is a Server Action: a function that runs ONLY
// on the server, but can be passed to a <form action={...}> and called from the
// browser. Next.js creates the endpoint for it - no fetch() or route.ts needed.
//
// Actions are public POST endpoints, so the input must be validated here even though
// the form has its own fields - anyone can call the action with any FormData.
import { z } from "zod";
import { saveFeedback } from "@/lib/feedback-store";

const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(500, "Message is too long"),
});

export type FeedbackState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string[]>>;
  // Echo the submitted values back so the form keeps what the user typed on failure.
  values?: { name: string; email: string; message: string };
};

export async function submitFeedback(_prev: FeedbackState, formData: FormData): Promise<FeedbackState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = feedbackSchema.safeParse(raw);
  if (!parsed.success) {
    // Return an error STATE instead of throwing - the UI renders it next to each field.
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    };
  }

  const entry = await saveFeedback({ name: parsed.data.name, message: parsed.data.message });
  return { status: "success", message: `Thanks ${entry.name}! Saved as feedback #${entry.id}.` };
}
