// docs/prisma-client-example.ts - Prisma Client usage with the GENERATED types.
// (Type-checked by `npx tsc --noEmit`; not imported by the app.)
import type { Post, Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// The return type is inferred from schema.prisma: User & { posts: Post[] }
export async function getAuthorWithPosts(email: string) {
  return prisma.user.findUnique({
    where: { email }, // only @id / @unique fields are allowed in findUnique's where
    include: { posts: true },
  });
}

// Input type generated from the model: required fields, optional defaults, relation.
export async function createDraft(authorId: string, title: string): Promise<Post> {
  const data: Prisma.PostUncheckedCreateInput = {
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    title,
    content: "",
    authorId, // published, createdAt, id fall back to their @default values
  };
  return prisma.post.create({ data });
}

export type UserSummary = Pick<User, "id" | "email" | "role">;
