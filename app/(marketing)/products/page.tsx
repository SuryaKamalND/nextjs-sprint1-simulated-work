// app/(marketing)/products/page.tsx  ->  /products  (static index)
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <section>
      <h1>Products</h1>
      <ul>
        {Object.entries(products).map(([id, product]) => (
          <li key={id}>
            <Link href={`/products/${id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
