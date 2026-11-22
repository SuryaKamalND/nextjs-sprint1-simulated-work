// Server-side role guard for pages/route handlers/actions (defence-in-depth on top
// of middleware, and for code paths the matcher doesn't cover).
import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasRole, type Role } from "@/lib/rbac";

export async function requireRole(allowed: Role[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { ok: false as const, status: 401 as const };
  if (!hasRole(session.user.role, allowed)) return { ok: false as const, status: 403 as const };
  return { ok: true as const, session };
}
