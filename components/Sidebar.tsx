"use client";

import { useState } from "react";
import Link from "next/link";

// Client Component: holds its own collapse state. Because it lives in the
// dashboard layout (which does not re-mount on in-section navigation),
// this state survives moving between /dashboard and /dashboard/settings.
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? "60px" : "200px",
        padding: "1rem",
        background: "#f3f4f6",
        color: "#111827",
        transition: "width 0.2s",
      }}
    >
      <button onClick={() => setCollapsed((c) => !c)}>
        {collapsed ? "→" : "← Collapse"}
      </button>
      {!collapsed && (
        <nav style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      )}
    </aside>
  );
}
