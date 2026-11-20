// instrumentation.ts - runs once when the Next.js server starts, before it serves requests.
// Importing lib/env here validates every required variable at startup, so a missing
// secret fails fast with a clear message instead of on the first request that needs it.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./lib/env");
    console.log("[env] all required environment variables are present");
  }
}
