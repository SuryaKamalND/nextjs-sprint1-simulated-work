// app/api/users/[id]/route.ts  ->  /api/users/1, /api/users/42, ...
// The [id] folder is a dynamic segment: whatever is in that part of the URL is
// passed to the handler as params.id.
import { z } from "zod";
import { fail, ok, withErrorHandling } from "@/lib/api-response";
import { findUser } from "@/lib/users-store";

// User ids are positive integers (as strings in the URL). Validate the shape
// BEFORE touching the data layer, so garbage like "abc" or "-1" never reaches it.
const userIdSchema = z.coerce.number().int().positive();

export const GET = withErrorHandling(
  async (
    _req: Request,
    // Next.js 15: the second argument's params is a Promise and must be awaited.
    { params }: { params: Promise<{ id: string }> }
  ) => {
    const { id } = await params;

    const parsed = userIdSchema.safeParse(id);
    if (!parsed.success) {
      return fail("INVALID_ID", "User id must be a positive integer", 400);
    }

    const user = findUser(String(parsed.data));
    if (!user) {
      // A well-formed id that doesn't exist is "not found", not a server error.
      return fail("NOT_FOUND", `User ${parsed.data} not found`, 404);
    }

    return ok(user);
  }
);
