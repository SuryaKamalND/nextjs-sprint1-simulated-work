"use client";

// Client Component: the ONLY interactive piece on the products page.
// It needs 'use client' because it uses useState and an onClick handler,
// which only exist in the browser.
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
}

export default function AddToCartButton({ productId, productName }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    setAdded(true);
    console.log(`Added ${productName} (${productId}) to cart`);
    // In a real app, this would call an API
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: added ? "#22c55e" : "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
    >
      {added ? "✓ Added!" : "Add to Cart"}
    </button>
  );
}
