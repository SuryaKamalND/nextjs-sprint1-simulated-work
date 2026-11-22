// Mock "database" of blog posts. In a real app getAllPosts/getPost would query a DB/CMS.
export type Post = { slug: string; title: string; content: string };

const posts: Post[] = [
  { slug: "hello-world", title: "Hello World", content: "First post!" },
  { slug: "next-js-tips", title: "Next.js Tips", content: "Performance tips" },
  { slug: "react-patterns", title: "React Patterns", content: "Design patterns" },
  { slug: "css-tricks", title: "CSS Tricks", content: "CSS tips" },
  { slug: "web-performance", title: "Web Performance", content: "Speed tips" },
  { slug: "my-first-post", title: "My First Post", content: "This is the content of the first post." },
  { slug: "nextjs-routing", title: "Understanding Next.js Routing", content: "Dynamic routes make building flexible apps easy." },
];

export async function getAllPosts(): Promise<Post[]> {
  return posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}
