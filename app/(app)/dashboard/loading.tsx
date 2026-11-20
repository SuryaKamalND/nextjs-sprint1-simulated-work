// app/(app)/dashboard/loading.tsx
// Route-level loading UI: Next.js wraps page.tsx in <Suspense fallback={<DashboardLoading />}>
// automatically, so this skeleton shows instantly while the page segment loads.
// It renders inside the dashboard layout, so the Sidebar stays visible.
const box = {
  backgroundColor: "#e0e0e0",
  borderRadius: "8px",
  animation: "pulse 2s infinite",
} as const;

export default function DashboardLoading() {
  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Dashboard</h1>

      {/* User stats skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ ...box, height: "100px" }} />
        ))}
      </div>

      {/* Chart skeleton */}
      <div style={{ ...box, height: "300px", marginBottom: "2rem" }} />

      {/* Feed skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ ...box, height: "60px" }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
