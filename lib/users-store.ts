// In-memory users "database" for the API demos (resets when the server restarts).
export type ApiUser = { id: string; name: string; email: string };

const users: ApiUser[] = [
  { id: "1", name: "Ava", email: "ava@example.com" },
  { id: "2", name: "Ben", email: "ben@example.com" },
];
let nextId = 3;

export function listUsers(): ApiUser[] {
  return users;
}

export function findUser(id: string): ApiUser | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(input: { name: string; email: string }): ApiUser {
  const user = { id: String(nextId++), ...input };
  users.push(user);
  return user;
}
