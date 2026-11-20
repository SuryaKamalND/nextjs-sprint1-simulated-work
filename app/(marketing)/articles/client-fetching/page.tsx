"use client";

// app/(marketing)/articles/client-fetching/page.tsx  ->  /articles/client-fetching
// ANTI-PATTERN kept for comparison: the same list, fetched in the browser with useEffect.
// Downsides: this whole component ships in the JS bundle, the first paint is an empty
// "Loading..." state, and the request runs from the user's browser after hydration.
// The Server Component version is app/(marketing)/articles/page.tsx.
import { useEffect, useState } from "react";
import { ARTICLES_URL, type Article } from "@/lib/articles";

export default function ArticlesPageBad() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ARTICLES_URL)
      .then((res) => res.json())
      .then((data: Article[]) => {
        setArticles(data.slice(0, 5));
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section style={{ maxWidth: "800px" }}>
      <h1>Articles (Client Fetching)</h1>
      {articles.map((article) => (
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
