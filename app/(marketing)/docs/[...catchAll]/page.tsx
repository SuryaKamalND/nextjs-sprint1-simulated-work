// app/(marketing)/docs/[...catchAll]/page.tsx  ->  /docs/a, /docs/a/b, /docs/a/b/c/d, ...
// Catch-all segment: every segment after /docs is captured as an array in params.catchAll.
// (Plain /docs has no segments, so it is not matched - that would need [[...catchAll]].)
export default async function DocsPage({
  params,
}: {
  params: Promise<{ catchAll: string[] }>;
}) {
  const { catchAll } = await params;
  const path = catchAll.join(" / ");
  const depth = catchAll.length;

  return (
    <section>
      <h1>Documentation</h1>
      <p>Current path: {path}</p>
      <p>Depth: {depth} segments</p>
      <ul>
        {catchAll.map((segment, index) => (
          <li key={index}>
            Segment {index + 1}: {segment}
          </li>
        ))}
      </ul>
    </section>
  );
}
