// app/(app)/admin/page.tsx  ->  /admin  (admins only - enforced by middleware.ts via lib/rbac.ts)
import { notFound } from "next/navigation";
import { listAuthUsers } from "@/lib/auth-users";
import { requireRole } from "@/lib/require-role";

export default async function AdminPage() {
  // Defence-in-depth: even if the matcher were changed, the page re-checks the role.
  const guard = await requireRole(["admin"]);
  if (!guard.ok) notFound();

  const users = listAuthUsers();
  return (
    <section style={{ padding: "1.5rem" }}>
      <h1>Admin: users</h1>
      <p>Signed in as {guard.session.user.email} (role: {guard.session.user.role})</p>
      <table style={{ borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0.25rem 1rem" }}>Email</th>
            <th style={{ textAlign: "left", padding: "0.25rem 1rem" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ padding: "0.25rem 1rem" }}>{u.email}</td>
              <td style={{ padding: "0.25rem 1rem" }}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
