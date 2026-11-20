// app/dashboard/settings/page.tsx  ->  /dashboard/settings
import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      <h1>Settings</h1>
      <Link href="/dashboard">← Back to Overview</Link>
    </>
  );
}
