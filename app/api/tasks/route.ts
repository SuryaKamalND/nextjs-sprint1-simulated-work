// app/api/tasks/route.ts  ->  /api/tasks
import { z } from "zod";
import { created, fail, ok, withErrorHandling } from "@/lib/api-response";
import { createTaskSchema } from "@/lib/schemas";
import { insertTask, listTasks } from "@/lib/tasks-store";

// GET /api/tasks -> 200
export const GET = withErrorHandling(async () => ok(listTasks()));

// POST /api/tasks -> 201 | 400 VALIDATION_ERROR | 401 UNAUTHORIZED | 500 (safe message)
export const POST = withErrorHandling(async (req: Request) => {
  // Demo auth check: writes require an API key header (real auth comes later).
  if (req.headers.get("x-api-key") !== "dev-key") {
    return fail("UNAUTHORIZED", "Missing or invalid API key", 401);
  }

  const body = await req.json().catch(() => undefined);

  // 1. Validate BEFORE any business logic / database code.
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) {
    return fail("VALIDATION_ERROR", "Invalid task data", 400, z.flattenError(parsed.error).fieldErrors);
  }

  // Demo of an unexpected server failure -> becomes a safe 500 via withErrorHandling.
  if (parsed.data.title === "crash the server") {
    throw new Error("db connection lost: postgres://admin:secret@10.0.0.5/prod");
  }

  // 2. Only the validated, typed data (parsed.data) goes downstream - never `body`.
  return created(insertTask(parsed.data));
});
