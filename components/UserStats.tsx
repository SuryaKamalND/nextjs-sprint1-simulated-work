// Async Server Component: simulates a 2-second database query.
export default async function UserStats() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const stats = [
    { label: "Active Users", value: "1,234" },
    { label: "Total Revenue", value: "$56.2K" },
    { label: "Conversion Rate", value: "3.2%" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", minHeight: "100px" }}>
      {stats.map((s) => (
        <div key={s.label} style={{ padding: "1rem", border: "1px solid #ccc" }}>
          <h3>{s.label}</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}
