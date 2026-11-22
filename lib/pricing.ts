// Simulated pricing source. In a real app this would be a DB/pricing API that
// is updated during the day. Here an in-memory "price list version" stands in for it.
export type Plan = { name: string; price: number };

let version = 1;

export async function getPricing() {
  return {
    generatedAt: new Date().toISOString(),
    version,
    plans: [
      { name: "Starter", price: 9 + version - 1 },
      { name: "Team", price: 29 + version - 1 },
      { name: "Business", price: 79 + version - 1 },
    ] satisfies Plan[],
  };
}

// Simulates an admin changing prices (the "mutation").
export async function bumpPrices() {
  version += 1;
}
