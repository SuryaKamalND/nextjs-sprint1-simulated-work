// app/(marketing)/products/page.tsx  ->  /products
// Server Component page (no 'use client'). Only the small AddToCartButton inside
// each ProductCard is a Client Component, so only that button's JS ships to the browser.
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <section>
      <h1>Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {Object.entries(products).map(([id, product]) => (
          <ProductCard key={id} id={id} product={product} />
        ))}
      </div>
    </section>
  );
}
