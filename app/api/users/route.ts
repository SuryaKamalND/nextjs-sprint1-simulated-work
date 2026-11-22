// app/api/users/route.ts  ->  /api/users
// A route.ts file turns its folder into an API endpoint (no page, no Express server).
// Each HTTP method is a NAMED export; any method not exported (PUT, DELETE...) gets
// an automatic 405 Method Not Allowed.
import { NextResponse } from "next/server";
import { createUser, listUsers } from "@/lib/users-store";

// GET /api/users -> 200 with the list
export async function GET() {
  return NextResponse.json({ success: true, data: listUsers() });
}

// POST /api/users  { "name": "...", "email": "..." } -> 201 with the created user
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Body must be valid JSON" }, { status: 400 });
  }

  const { name, email } = (body ?? {}) as { name?: unknown; email?: unknown };
  if (typeof name !== "string" || name.trim() === "" || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "name (non-empty string) and email (valid address) are required" },
      { status: 400 }
    );
  }

  const user = createUser({ name: name.trim(), email });
  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
