import { PrismaClient } from "@generated";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Setup PostgreSQL pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Prevent multiple instances in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;