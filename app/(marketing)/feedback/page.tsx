// app/(marketing)/feedback/page.tsx  ->  /feedback
export const dynamic = "force-dynamic";

import { listFeedback } from "@/lib/feedback-store";
import FeedbackForm from "./FeedbackForm";

export default async function FeedbackPage() {
  const entries = await listFeedback();

  return (
    <section>
      <h1>Feedback</h1>
      <FeedbackForm />
      <h2 style={{ marginTop: "2rem" }}>Recent feedback</h2>
      <ul>
        {entries.map((e) => (
          <li key={e.id}>
            <strong>{e.name}</strong>: {e.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
