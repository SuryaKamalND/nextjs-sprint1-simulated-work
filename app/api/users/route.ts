// app/api/users/route.ts  ->  /api/users
// A route.ts file turns its folder into an API endpoint (no page, no Express server).
// Each HTTP method is a NAMED export; any method not exported (PUT, DELETE...) gets
// an automatic 405 Method Not Allowed.
import { NextResponse } from "next/server";
import { z } from "zod";
import { createUserSchema } from "@/lib/schemas";
import { createUser, listUsers } from "@/lib/users-store";

// GET /api/users -> 200 with the list
export async function GET() {
  return NextResponse.json({ success: true, data: listUsers() });
}

// POST /api/users  { "name": "...", "email": "..." } -> 201 with the created user
export async function POST(req: Request) {
  const body = await req.json().catch(() => undefined);

  // Validate first: invalid input never reaches createUser().
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: z.flattenError(parsed.error) }, { status: 400 });
  }

  const user = createUser(parsed.data); // typed as CreateUserInput
  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
