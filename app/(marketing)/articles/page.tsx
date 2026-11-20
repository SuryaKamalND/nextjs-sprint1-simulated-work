// app/(marketing)/articles/page.tsx  ->  /articles
// Server Component (the default): no 'use client', no hooks, no loading state.
// It is async and awaits the data directly on the server, so the browser only
// receives the rendered HTML - never this fetching code.
import Link from "next/link";
import { ARTICLES_URL, type Article } from "@/lib/articles";

export default async function ArticlesPage() {
  // SERVER_ONLY_MARKER: this comment and the fetch below never ship to the browser.
  const response = await fetch(ARTICLES_URL);
  const articles: Article[] = await response.json();

  return (
    <section style={{ maxWidth: "800px" }}>
      <h1>Articles (Server Fetching)</h1>
      <p style={{ opacity: 0.7 }}>
        Compare with the <Link href="/articles/client-fetching">client-fetching version</Link>.
      </p>
      {articles.slice(0, 5).map((article) => (
        <article
          key={article.id}
          style={{ padding: "1rem", border: "1px solid #ddd", marginBottom: "1rem", borderRadius: "4px" }}
        >
          <h2>{article.title}</h2>
          <p>{article.body.substring(0, 100)}...</p>
        </article>
      ))}
    </section>
  );
}
