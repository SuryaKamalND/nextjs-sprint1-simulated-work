// app/api/test/route.ts  ->  GET /api/test
import { env } from "@/lib/env";

export async function GET() {
  // Log only the host part of the connection string - never the credentials.
  console.log("Using database:", env.database.url.split("@")[1]);

  return Response.json({
    message: "Environment variables loaded successfully",
    appName: env.public.appName,
  });
}
