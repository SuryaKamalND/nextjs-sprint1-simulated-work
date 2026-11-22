// Feedback "database". Marked server-only: importing this from client code fails the
// build, which proves the Server Action that uses it really runs on the server.
import "server-only";
import { unstable_cache } from "next/cache";

export type Feedback = { id: number; name: string; message: string; createdAt: string };

// Kept on globalThis: Next.js can load this module separately for Server Actions and
// for page rendering, and a plain module-level array would then exist twice (the page
// would never see what the action saved). A real database doesn't have this issue.
const db = ((globalThis as { __feedbackDb?: { entries: Feedback[]; nextId: number } }).__feedbackDb ??= {
  entries: [{ id: 1, name: "Ava", message: "Love the new dashboard!", createdAt: "2026-11-20T10:00:00.000Z" }],
  nextId: 2,
});

export async function listFeedback(): Promise<Feedback[]> {
  return [...db.entries].reverse();
}

export async function saveFeedback(input: { name: string; message: string }): Promise<Feedback> {
  const entry = { id: db.nextId++, createdAt: new Date().toISOString(), ...input };
  db.entries.push(entry);
  console.log(`[feedback] saved #${entry.id} from ${entry.name} (pid ${process.pid})`);
  return entry;
}

// Cached read: the list is stored in Next's data cache under the "feedback" tag, so
// pages don't hit the store on every render. A mutation must call
// revalidateTag(FEEDBACK_TAG) or every reader keeps seeing the old list.
export const FEEDBACK_TAG = "feedback";

export const getCachedFeedback = unstable_cache(listFeedback, ["feedback-list"], { tags: [FEEDBACK_TAG] });
