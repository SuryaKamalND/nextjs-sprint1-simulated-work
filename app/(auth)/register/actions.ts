"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { registerUser } from "@/lib/auth-users";

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpState = { error?: string; fieldErrors?: Partial<Record<"name" | "email" | "password", string[]>> };

export async function signUp(_prev: SignUpState, formData: FormData): Promise<SignUpState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { fieldErrors: z.flattenError(parsed.error).fieldErrors };

  try {
    await registerUser(parsed.data); // hashes the password with bcrypt before storing
  } catch (e) {
    if (e instanceof Error && e.message === "EMAIL_TAKEN") return { error: "An account with this email already exists." };
    throw e;
  }

  redirect("/login?registered=1");
}
