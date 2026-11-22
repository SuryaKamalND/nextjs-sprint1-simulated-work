// app/(marketing)/blog/[slug]/page.tsx  ->  /blog/hello-world, /blog/next-js-tips, ...
// Static generation: generateStaticParams runs ONCE at build time and returns every
// slug to pre-render. Each returned object's key (`slug`) must match the [slug] folder.
// Requests for those slugs are then served as ready-made HTML - no data lookup per visit.
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  // -> [{ slug: "hello-world" }, { slug: "next-js-tips" }, ...]
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  // In Next.js 15, params is a Promise and must be awaited.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    // Unknown slug -> nearest not-found.tsx (app/(marketing)/blog/not-found.tsx), HTTP 404.
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ opacity: 0.7 }}>slug: {slug}</p>
    </article>
  );
}
