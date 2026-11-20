// app/(marketing)/products/[id]/reviews/page.tsx  ->  /products/shoe-001/reviews
// A static segment nested under a dynamic one: the [id] param is still available here.
import Link from "next/link";
import { products } from "@/lib/products";

export default async function ProductReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id];

  return (
    <section>
      <h1>Reviews for {product ? product.name : id}</h1>
      {product && product.reviews.length > 0 ? (
        <ul>
          {product.reviews.map((review, i) => (
            <li key={i}>{review}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
      <Link href={`/products/${id}`}>← Back to product</Link>
    </section>
  );
}
