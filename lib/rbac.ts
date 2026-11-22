// lib/rbac.ts - the ONE place that defines who may access what.
// Edge-safe (no Node-only imports) so middleware.ts can use it too.
export type Role = "user" | "admin";

// Role matrix: which roles may open which path prefixes.
// Anything not listed here only needs a signed-in user (see middleware matcher).
export const ROUTE_RULES: { prefix: string; roles: Role[] }[] = [
  { prefix: "/admin", roles: ["admin"] },
  { prefix: "/api/admin", roles: ["admin"] },
];

export function requiredRolesFor(pathname: string): Role[] | null {
  const rule = ROUTE_RULES.find((r) => pathname === r.prefix || pathname.startsWith(r.prefix + "/"));
  return rule ? rule.roles : null;
}

export function hasRole(role: Role | undefined, allowed: Role[]): boolean {
  return role !== undefined && allowed.includes(role);
}
