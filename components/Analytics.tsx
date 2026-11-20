"use client";

// NEXT_PUBLIC_ variables are inlined into the client bundle at build time,
// so they are readable here in a Client Component (and visible in page source).
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return (
    <div style={{ fontSize: "0.75rem", color: "#999", padding: "1rem" }}>
      {process.env.NEXT_PUBLIC_APP_NAME} · Analytics ID: {gaId}
    </div>
  );
}
