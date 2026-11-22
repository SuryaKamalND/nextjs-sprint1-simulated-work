// Simulated account data source. Each call takes ~1 s.
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type User = { id: string; email: string; name: string };
export type Order = { id: string; item: string; total: number };
export type Preferences = { currency: string; newsletter: boolean };

const users: User[] = [
  { id: "u1", email: "ava@example.com", name: "Ava" },
  { id: "u2", email: "ben@example.com", name: "Ben" },
];

const ordersByUser: Record<string, Order[]> = {
  u1: [
    { id: "o-101", item: "Keyboard", total: 49 },
    { id: "o-102", item: "Monitor", total: 189 },
  ],
};

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await delay(1000);
  return users.find((u) => u.email === email);
}

// Needs a userId -> can only start AFTER getUserByEmail has finished.
export async function getOrdersForUser(userId: string): Promise<Order[]> {
  await delay(1000);
  if (userId === "u2") throw new Error("orders service timeout"); // simulated failure for Ben
  return ordersByUser[userId] ?? [];
}

// Independent of the user lookup -> can run in parallel with it.
export async function getPreferences(): Promise<Preferences> {
  await delay(1000);
  return { currency: "USD", newsletter: true };
}
