// app/(marketing)/blog/[slug]/page.tsx  ->  /blog/my-first-post, /blog/hello-world, ...
// Single dynamic segment: exactly ONE URL segment after /blog is captured as params.slug.
// Note: the static /blog/getting-started folder still wins over [slug] for that exact URL.

const posts: Record<string, { title: string; content: string }> = {
  "my-first-post": {
    title: "My First Post",
    content: "This is the content of the first post.",
  },
  "hello-world": {
    title: "Hello World",
    content: "A classic introduction.",
  },
  "nextjs-routing": {
    title: "Understanding Next.js Routing",
    content: "Dynamic routes make building flexible apps easy.",
  },
};

export default async function BlogPostPage({
  params,
}: {
  // In Next.js 15, params is a Promise and must be awaited.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // In a real app this would be a database lookup by slug.
  const post = posts[slug];

  if (!post) {
    return <h1>Post not found: {slug}</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ opacity: 0.7 }}>slug: {slug}</p>
    </article>
  );
}
