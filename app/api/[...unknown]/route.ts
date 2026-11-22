// app/api/[...unknown]/route.ts - any /api/* path without its own route.ts.
// Returns the standard JSON error shape (instead of Next's HTML 404 page) so API
// clients can parse every failure the same way.
import { fail } from "@/lib/api-response";

const notFound = () => fail("NOT_FOUND", "API route not found", 404);

export { notFound as GET, notFound as POST, notFound as PUT, notFound as PATCH, notFound as DELETE };
