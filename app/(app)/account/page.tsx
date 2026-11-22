// app/(app)/account/page.tsx  ->  /account?email=ava@example.com
// Combines SEQUENTIAL fetching (where there is a real dependency) with PARALLEL
// fetching (where there isn't):
//   getPreferences()      - independent, started immediately
//   getUserByEmail(email) - must finish first...
//   getOrdersForUser(id)  - ...because orders need user.id
// Timeline: [prefs ~1s] runs alongside [user ~1s -> orders ~1s] => ~2 s total
// (fully sequential would be ~3 s).
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getOrdersForUser, getPreferences, getUserByEmail, type Order } from "@/lib/account-data";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "ava@example.com" } = await searchParams;
  const started = Date.now();

  // Independent work: start it now, don't await yet.
  const preferencesPromise = getPreferences();

  // Step 1: the user. A missing user is a 404, not a crash.
  const user = await getUserByEmail(email);
  if (!user) notFound();

  // Step 2: orders need user.id from step 1, so this has to wait for it.
  // Await it together with the preferences that have been loading in the meantime.
  // Order failures get their own fallback (and the raw error is only logged).
  const [ordersResult, preferences] = await Promise.all([
    getOrdersForUser(user.id).then(
      (orders): { ok: true; orders: Order[] } => ({ ok: true, orders }),
      (error: unknown) => {
        console.error(`[account] orders failed for ${user.id}:`, error);
        return { ok: false as const };
      }
    ),
    preferencesPromise,
  ]);

  const ms = Date.now() - started;
  console.log(`[account] loaded ${email} in ${ms} ms`);

  return (
    <section style={{ padding: "1.5rem" }}>
      <h1>Account: {user.name}</h1>
      <p style={{ opacity: 0.7 }}>
        {user.email} · loaded in <strong>{ms} ms</strong>
      </p>

      <h2>Orders</h2>
      {ordersResult.ok ? (
        ordersResult.orders.length > 0 ? (
          <ul>
            {ordersResult.orders.map((o) => (
              <li key={o.id}>
                {o.item}: ${o.total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders yet.</p>
        )
      ) : (
        <p>We couldn&apos;t load your orders right now. Please try again later.</p>
      )}

      <h2>Preferences</h2>
      <p>
        Currency: {preferences.currency} · Newsletter: {preferences.newsletter ? "on" : "off"}
      </p>
    </section>
  );
}
