# Dynamic route structure

All three live in the `(marketing)` route group, so the group name never appears in URLs.

| Route file | Pattern | Params received | Example URL → params |
|---|---|---|---|
| `app/(marketing)/blog/[slug]/page.tsx` | single dynamic segment `[slug]` | `{ slug: string }` | `/blog/hello-world` → `{ slug: "hello-world" }` |
| `app/(marketing)/docs/[...catchAll]/page.tsx` | catch-all `[...catchAll]` | `{ catchAll: string[] }` | `/docs/guides/advanced/setup/config` → `{ catchAll: ["guides","advanced","setup","config"] }` |
| `app/(marketing)/products/page.tsx` | static | none | `/products` |
| `app/(marketing)/products/[id]/page.tsx` | single dynamic segment `[id]` | `{ id: string }` | `/products/shoe-001` → `{ id: "shoe-001" }` |
| `app/(marketing)/products/[id]/reviews/page.tsx` | static segment nested under `[id]` | `{ id: string }` | `/products/shoe-001/reviews` → `{ id: "shoe-001" }` |

## Why each pattern

- **`[slug]` for blog posts:** a post URL always has exactly one segment after `/blog`. One template renders every post; the slug is the lookup key. A static folder (`/blog/getting-started`) still takes priority over `[slug]` for that exact URL.
- **`[...catchAll]` for docs:** documentation can be nested to any depth, so we need *all* remaining segments as an array rather than a fixed number of dynamic folders. Note that `/docs` alone is not matched; an optional catch-all `[[...catchAll]]` would be needed for that.
- **Static + dynamic for products:** `/products` is a fixed index page, `/products/[id]` is the per-product template, and `/products/[id]/reviews` shows that static folders can sit inside a dynamic segment and still receive its param.

In Next.js 15, `params` is a `Promise`, so each page is an `async` component that does `const { slug } = await params`.
