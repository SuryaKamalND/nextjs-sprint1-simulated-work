// app/(marketing)/notifications/page.tsx  ->  /notifications
// force-dynamic: never cache this page. It is rendered on the server for EVERY
// request, so notifications are always fresh. Use it for real-time / per-user data.
// Trade-off: every visit pays the full render + data-fetch cost (no CDN/static HTML).
export const dynamic = "force-dynamic";

import { getNotifications, now } from "@/lib/notifications";

export default async function NotificationsPage() {
  const notifications = await getNotifications([
    "New message from Alice",
    "System alert: High CPU usage",
    "Order #12345 shipped",
  ]);

  return (
    <section style={{ maxWidth: "600px" }}>
      <h1>Notifications (Real-Time)</h1>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Page rendered at: {now()}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notifications.map((notif) => (
          <li
            key={notif.id}
            style={{
              padding: "1rem",
              backgroundColor: "#f0f0f0",
              color: "#111",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <p>{notif.message}</p>
            <small style={{ color: "#666" }}>Fetched: {notif.timestamp}</small>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: "2rem", opacity: 0.6, fontSize: "0.9rem" }}>
        Refresh the page - timestamps update, proving it renders fresh each time.
      </p>
    </section>
  );
}
