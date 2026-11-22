// Feedback "database". Marked server-only: importing this from client code fails the
// build, which proves the Server Action that uses it really runs on the server.
import "server-only";

export type Feedback = { id: number; name: string; message: string; createdAt: string };

const entries: Feedback[] = [
  { id: 1, name: "Ava", message: "Love the new dashboard!", createdAt: "2026-11-20T10:00:00.000Z" },
];
let nextId = 2;

export async function listFeedback(): Promise<Feedback[]> {
  return [...entries].reverse();
}

export async function saveFeedback(input: { name: string; message: string }): Promise<Feedback> {
  const entry = { id: nextId++, createdAt: new Date().toISOString(), ...input };
  entries.push(entry);
  console.log(`[feedback] saved #${entry.id} from ${entry.name} (pid ${process.pid})`);
  return entry;
}
