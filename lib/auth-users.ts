// User accounts for credentials auth. Only a bcrypt HASH of the password is ever
// stored - never the password itself. (In-memory demo store on globalThis so the
// Server Action and the NextAuth route share it; a real app would use a database.)
import "server-only";
import bcrypt from "bcryptjs";

import type { Role } from "@/lib/rbac";

export type { Role };
// Every account has a role (default "user"); it is copied into the session JWT on sign-in.
export type AuthUser = { id: string; email: string; name: string; passwordHash: string; role: Role };

// 12 salt rounds: each hash takes ~200 ms - slow enough to make brute-forcing a
// stolen hash expensive, fast enough that a single sign-in still feels instant.
export const SALT_ROUNDS = 12;

const store = ((globalThis as { __authUsers?: AuthUser[] }).__authUsers ??= []);

// Development-only seed so the admin page can be demoed. Never seeded in production.
if (process.env.NODE_ENV !== "production" && !store.some((u) => u.role === "admin")) {
  store.push({
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin",
    passwordHash: bcrypt.hashSync("admin-pass-123", SALT_ROUNDS),
    role: "admin",
  });
}

// Safe listing for the admin UI - never exposes password hashes.
export function listAuthUsers() {
  return store.map(({ id, email, name, role }) => ({ id, email, name, role }));
}

export async function findUserByEmail(email: string): Promise<AuthUser | undefined> {
  return store.find((u) => u.email === email.toLowerCase());
}

export async function registerUser(input: { name: string; email: string; password: string }): Promise<AuthUser> {
  if (await findUserByEmail(input.email)) throw new Error("EMAIL_TAKEN");

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS); // salt is generated + embedded in the hash
  const user: AuthUser = {
    id: String(store.length + 1),
    email: input.email.toLowerCase(),
    name: input.name,
    passwordHash,
    role: "user",
  };
  store.push(user);
  console.log(`[auth] registered ${user.email} hash=${passwordHash.slice(0, 7)}… (${passwordHash.length} chars)`);
  return user;
}

// A precomputed hash used when the email doesn't exist, so a missing user takes the
// same time as a wrong password (no timing leak revealing which emails are registered).
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", SALT_ROUNDS);

export async function verifyCredentials(email: string, password: string): Promise<AuthUser | null> {
  const user = await findUserByEmail(email);
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  return user && ok ? user : null;
}
