// app/(app)/dashboard/page.tsx  ->  /dashboard
// Each slow component has its own <Suspense> boundary, so all three start fetching
// in parallel and stream in independently as they resolve (1s, 2s, 3s) instead of
// the whole page waiting for the slowest one.
import { Suspense } from "react";
import Link from "next/link";
import UserStats from "@/components/UserStats";
import AnalyticsChart from "@/components/AnalyticsChart";
import LiveFeed from "@/components/LiveFeed";

const fallback = (height: string, label: string) => (
  <div style={{ height, backgroundColor: "#f0f0f0", color: "#555", marginBottom: "1rem", padding: "0.5rem" }}>
    {label}
  </div>
);

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "0.5rem" }}>Dashboard</h1>
      <p style={{ marginBottom: "2rem" }}>
        <Link href="/dashboard/settings">Go to Settings →</Link>
      </p>

      {/* User Stats - 2 second delay */}
      <Suspense fallback={fallback("100px", "Loading user stats...")}>
        <UserStats />
      </Suspense>

      {/* Analytics Chart - 3 second delay (slowest) */}
      <div style={{ marginTop: "1rem" }}>
        <Suspense fallback={fallback("300px", "Loading chart...")}>
          <AnalyticsChart />
        </Suspense>
      </div>

      {/* Live Feed - 1 second delay (fastest) */}
      <div style={{ marginTop: "1rem" }}>
        <Suspense fallback={fallback("200px", "Loading feed...")}>
          <LiveFeed />
        </Suspense>
      </div>
    </div>
  );
}
