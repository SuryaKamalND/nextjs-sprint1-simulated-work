import { Sidebar } from "@/components/Sidebar";

// Nested layout: wraps only routes under /dashboard.
// It does NOT render <html>/<body> - those belong to the root layout.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("[DashboardLayout] rendered");
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "1.5rem" }}>{children}</div>
    </div>
  );
}
