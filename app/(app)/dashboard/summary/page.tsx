// app/(app)/dashboard/summary/page.tsx  ->  /dashboard/summary
//   /dashboard/summary              -> parallel fetching (Promise.all)
//   /dashboard/summary?mode=sequential -> the waterfall, for comparison
// Rendered per request so the timing is measured live.
export const dynamic = "force-dynamic";

import { loadParallel, loadSequential } from "@/lib/dashboard-data";

export default async function SummaryPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const sequential = mode === "sequential";

  try {
    const { profile, notifications, analytics, ms } = sequential ? await loadSequential() : await loadParallel();
    console.log(`[summary] ${sequential ? "sequential" : "parallel"} ms`, ms);

    return (
      <section>
        <h1>Dashboard Summary</h1>
        <p>
          Loaded with <strong>{sequential ? "sequential awaits (waterfall)" : "Promise.all (parallel)"}</strong> in{" "}
          <strong>{ms} ms</strong>
        </p>
        <h2>Profile</h2>
        <p>
          {profile.name} ({profile.role})
        </p>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <h2>Analytics</h2>
        <p>
          {analytics.visits} visits · {analytics.signups} signups
        </p>
      </section>
    );
  } catch (error) {
    // Promise.all rejects as soon as ANY loader fails, so one try/catch covers all three.
    console.error("[summary] failed to load dashboard data", error);
    return (
      <section>
        <h1>Dashboard Summary</h1>
        <p>Sorry, we couldn&apos;t load your dashboard right now. Please try again.</p>
      </section>
    );
  }
}
