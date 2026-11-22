// app/(marketing)/feedback/page.tsx  ->  /feedback
// The list comes from getCachedFeedback (data cache, tag "feedback"). Without the
// revalidateTag() call in the action, a new entry would NOT show up here.
import { getCachedFeedback } from "@/lib/feedback-store";
import FeedbackForm from "./FeedbackForm";

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;
  const entries = await getCachedFeedback();

  return (
    <section>
      <h1>Feedback</h1>
      {sent && (
        <p role="status" style={{ color: "#16a34a" }}>
          Thanks! Your feedback #{sent} was saved and is now in the list below.
        </p>
      )}
      <FeedbackForm />
      <h2 style={{ marginTop: "2rem" }}>Recent feedback ({entries.length})</h2>
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
