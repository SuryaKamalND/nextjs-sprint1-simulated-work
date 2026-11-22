// app/api/admin/users/route.ts  ->  GET /api/admin/users  (admins only)
import { fail, ok, withErrorHandling } from "@/lib/api-response";
import { listAuthUsers } from "@/lib/auth-users";
import { requireRole } from "@/lib/require-role";

export const GET = withErrorHandling(async () => {
  // Same rule as middleware, checked again right next to the data.
  const guard = await requireRole(["admin"]);
  if (!guard.ok) {
    return guard.status === 401 ? fail("UNAUTHORIZED", "Sign in required", 401) : fail("FORBIDDEN", "Admins only", 403);
  }
  return ok(listAuthUsers());
});
