// Three INDEPENDENT data loaders: none needs another's result, so they can run
// at the same time. Each one simulates a 1-second API/database call.
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProfile() {
  await delay(1000);
  return { name: "Ava", role: "Admin" };
}

export async function getNotifications() {
  await delay(1000);
  return ["Build passed", "New comment"];
}

export async function getAnalytics() {
  await delay(1000);
  return { visits: 1280, signups: 42 };
}

// WATERFALL (for comparison): each await blocks the next call from even starting.
export async function loadSequential() {
  const started = Date.now();
  const profile = await getProfile();
  const notifications = await getNotifications();
  const analytics = await getAnalytics();
  return { profile, notifications, analytics, ms: Date.now() - started };
}

// PARALLEL: all three promises are created first, then awaited together.
export async function loadParallel() {
  const started = Date.now();
  const [profile, notifications, analytics] = await Promise.all([
    getProfile(),
    getNotifications(),
    getAnalytics(),
  ]);
  return { profile, notifications, analytics, ms: Date.now() - started };
}
