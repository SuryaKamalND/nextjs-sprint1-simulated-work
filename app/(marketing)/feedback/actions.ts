"use server";

// Every export of a 'use server' file is a Server Action: a function that runs ONLY
// on the server, but can be passed to a <form action={...}> and called from the
// browser. Next.js creates the endpoint for it - no fetch() or route.ts needed.
import { saveFeedback } from "@/lib/feedback-store";

export type FeedbackResult = { ok: true; id: number; message: string } | { ok: false; message: string } | null;

export async function submitFeedback(_prev: FeedbackResult, formData: FormData): Promise<FeedbackResult> {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message) {
    return { ok: false, message: "Please fill in both fields." };
  }

  const entry = await saveFeedback({ name, message }); // server-only module

  // Return plain, serialisable data - it is sent back to the client component.
  return { ok: true, id: entry.id, message: `Thanks ${entry.name}! Saved as feedback #${entry.id}.` };
}
