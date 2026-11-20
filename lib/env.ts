// lib/env.ts - single, validated source of configuration.
// Server-only: importing this from a Client Component would fail, because the
// secrets below are not inlined into the browser bundle (no NEXT_PUBLIC_ prefix).
import "server-only";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Check .env.local or your environment configuration.`
    );
  }
  return value;
}

export const env = {
  // Server-only secrets - required, the app refuses to start without them
  database: {
    url: requireEnv("DATABASE_URL"),
  },
  api: {
    secretKey: requireEnv("API_SECRET_KEY"),
  },
  jwt: {
    secret: requireEnv("JWT_SECRET"),
  },
  stripe: {
    secretKey: requireEnv("STRIPE_SECRET_KEY"),
  },

  // Public variables - optional, with safe defaults
  public: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    appName: process.env.NEXT_PUBLIC_APP_NAME || "My App",
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "not-set",
  },
};
