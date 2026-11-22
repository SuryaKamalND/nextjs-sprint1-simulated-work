// app/(marketing)/blog/page.tsx  ->  /blog
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section>
      <h1>Blog</h1>
      <ul>
        <li>
          <Link href="/blog/getting-started">Getting Started</Link>
        </li>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
