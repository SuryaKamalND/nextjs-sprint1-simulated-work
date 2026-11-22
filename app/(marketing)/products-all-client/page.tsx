"use client";

// app/(marketing)/products-all-client/page.tsx  ->  /products-all-client
// COMPARISON ONLY: the same products page with 'use client' on the whole page
// ("just in case" style). Everything below - the list, the cards, the data - now
// ships to the browser as JavaScript. Compare its First Load JS with /products
// in the `npm run build` output.
import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

function Card({ id, name, price }: { id: string; name: string; price: number }) {
  const [added, setAdded] = useState(false);
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
      <h2>
        <Link href={`/products/${id}`}>{name}</Link>
      </h2>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${price}</p>
      <button
        onClick={() => {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        style={{ padding: "0.5rem 1rem", backgroundColor: added ? "#22c55e" : "#3b82f6", color: "white", border: "none", borderRadius: "4px" }}
      >
        {added ? "✓ Added!" : `Add ${id} to Cart`}
      </button>
    </div>
  );
}

export default function ProductsAllClientPage() {
  return (
    <section>
      <h1>Products (everything is a Client Component)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {Object.entries(products).map(([id, p]) => (
          <Card key={id} id={id} name={p.name} price={p.price} />
        ))}
      </div>
    </section>
  );
}
