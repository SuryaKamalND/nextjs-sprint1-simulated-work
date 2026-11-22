// Server Component (no 'use client'): renders static markup on the server and
// passes plain, serialisable props down to the AddToCartButton Client Component.
// It could not use useState or onClick itself - those only work in Client Components.
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  id: string;
  product: { name: string; price: number };
}

export default function ProductCard({ id, product }: ProductCardProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
      <h2>
        <Link href={`/products/${id}`}>{product.name}</Link>
      </h2>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${product.price}</p>
      {/* Client Component used as a child of a Server Component */}
      <AddToCartButton productId={id} productName={product.name} />
    </div>
  );
}
