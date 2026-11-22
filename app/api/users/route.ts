// app/api/users/route.ts  ->  /api/users
// A route.ts file turns its folder into an API endpoint (no page, no Express server).
// Each HTTP method is a NAMED export; any method not exported (PUT, DELETE...) gets
// an automatic 405 Method Not Allowed.
import { z } from "zod";
import { created, fail, ok, withErrorHandling } from "@/lib/api-response";
import { createUserSchema } from "@/lib/schemas";
import { createUser, listUsers } from "@/lib/users-store";

// GET /api/users -> 200 { success: true, data: [...] }
export const GET = withErrorHandling(async () => ok(listUsers()));

// POST /api/users -> 201 created | 400 VALIDATION_ERROR
export const POST = withErrorHandling(async (req: Request) => {
  const body = await req.json().catch(() => undefined);

  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return fail("VALIDATION_ERROR", "Invalid user data", 400, z.flattenError(parsed.error).fieldErrors);
  }

  return created(createUser(parsed.data));
});
