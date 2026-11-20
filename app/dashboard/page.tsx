// app/dashboard/page.tsx  ->  /dashboard
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard Overview</h1>
      {/* In-page link so navigation also works while the sidebar is collapsed */}
      <Link href="/dashboard/settings">Go to Settings →</Link>
    </>
  );
}
