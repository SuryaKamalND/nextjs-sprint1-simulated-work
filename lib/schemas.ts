// Request-body schemas. The schema is the single source of truth: Zod validates at
// runtime and z.infer derives the TypeScript type, so the two can never drift apart.
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "name must be at least 2 characters"),
  email: z.email("email must be a valid email address"),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const createTaskSchema = z.object({
  title: z.string().trim().min(3, "title must be at least 3 characters"),
  priority: z.enum(["low", "medium", "high"]),
});
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
