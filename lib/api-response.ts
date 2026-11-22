// lib/api-response.ts - ONE response shape for every API route, so the frontend
// can handle any endpoint the same way:
//   success: { success: true,  data }
//   failure: { success: false, error: { code, message, details? } }
// together with the correct HTTP status code.

export function ok<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function created<T>(data: T) {
  return ok(data, 201);
}

export function fail(code: string, message: string, status: number, details?: unknown) {
  return Response.json(
    { success: false, error: { code, message, ...(details !== undefined ? { details } : {}) } },
    { status }
  );
}

// Wraps a handler so unexpected exceptions become a safe 500: the real error is
// logged on the server, the client only ever sees a generic message (no stack trace).
export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<Response>
) {
  return async (...args: Args): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("[api] unhandled error:", error);
      return fail("INTERNAL_SERVER_ERROR", "Something went wrong", 500);
    }
  };
}
