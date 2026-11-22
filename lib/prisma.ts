// lib/prisma.ts - one shared Prisma Client.
// In dev, hot reload re-runs modules; creating a new PrismaClient each time would open
// a new connection pool every reload ("too many connections"). Keeping it on
// globalThis reuses the same client across reloads.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.PRISMA_LOG_QUERIES === "1" ? ["query"] : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
