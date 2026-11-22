// app/(marketing)/static-notifications/page.tsx  ->  /static-notifications
// NO force-dynamic and no dynamic APIs (cookies(), headers(), searchParams...), so
// Next.js prerenders this page ONCE at build time and serves that same HTML forever.
// Note: `npm run dev` re-renders every request, so the caching only shows with
// `npm run build && npm start`.
import { getNotifications, now } from "@/lib/notifications";

export default async function StaticNotificationsPage() {
  const notifications = await getNotifications(["This notification may be stale"]);

  return (
    <section>
      <h1>Notifications (Cached)</h1>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Page rendered at: {now()}</p>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>
            {notif.message} <small>(fetched {notif.timestamp})</small>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: "2rem", opacity: 0.6, fontSize: "0.9rem" }}>
        Refresh the page - the timestamp will NOT update (it is cached).
      </p>
    </section>
  );
}
