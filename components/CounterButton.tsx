"use client";

// Leaf Client Component: the only part of the Footer that needs the browser.
import { useState } from "react";

export default function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Clicks: {count}
    </button>
  );
}
