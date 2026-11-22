// app/api/tasks/route.ts  ->  /api/tasks
import { z } from "zod";
import { createTaskSchema } from "@/lib/schemas";
import { insertTask, listTasks } from "@/lib/tasks-store";

export async function GET() {
  return Response.json({ success: true, data: listTasks() });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined);

  // 1. Validate BEFORE any business logic / database code.
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ success: false, error: z.flattenError(parsed.error) }, { status: 400 });
  }

  // 2. Only the validated, typed data (parsed.data) goes downstream - never `body`.
  const task = insertTask(parsed.data);
  return Response.json({ success: true, data: task }, { status: 201 });
}
