// Simulated real-time notification source (stands in for an API call).
export type Notification = { id: number; message: string; timestamp: string };

export const now = () => new Date().toISOString().slice(11, 19) + " UTC";

export async function getNotifications(messages: string[]): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return messages.map((message, i) => ({ id: i + 1, message, timestamp: now() }));
}
