// app/(marketing)/products/[id]/page.tsx  ->  /products/shoe-001, /products/shirt-001, ...
import Link from "next/link";
import { products } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id];

  if (!product) {
    return (
      <section>
        <h1>Product Not Found</h1>
        <p>No product with ID: {id}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>{product.name}</h1>
      <p>Product ID: {id}</p>
      <p>Price: ${product.price}</p>
      <Link href={`/products/${id}/reviews`}>View Reviews</Link>
    </section>
  );
}
