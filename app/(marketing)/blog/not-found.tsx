// app/(marketing)/blog/not-found.tsx - blog-specific 404.
// Takes precedence over app/not-found.tsx for notFound() calls under /blog.
// Renders inside the (marketing) layout, so it keeps the marketing header/footer.
import Link from "next/link";

export default function BlogNotFound() {
  return (
    <section style={{ maxWidth: "600px" }}>
      <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / Not found
      </p>
      <h1>Post Not Found</h1>
      <p>
        The blog post you are looking for does not exist. It may have been removed
        or the slug may be incorrect.
      </p>
      <section style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0", color: "#111" }}>
        <h2 style={{ marginTop: 0 }}>Recent Posts</h2>
        <ul>
          <li><Link href="/blog/my-first-post">My First Post</Link></li>
          <li><Link href="/blog/hello-world">Hello World</Link></li>
          <li><Link href="/blog/nextjs-routing">Next.js Routing</Link></li>
        </ul>
      </section>
      <nav style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link href="/blog">← All Posts</Link>
        <Link href="/">Go Home</Link>
      </nav>
    </section>
  );
}
