/**
 * Prisma Client Singleton
 * ========================
 * Optimized for Next.js with Prisma 7 configuration.
 * Uses PrismaPg adapter for direct PostgreSQL connections.
 * Ensures a single instance is reused across hot reloads in development.
 */

import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const createPrismaClient = () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })

  return new PrismaClient({ adapter })
}

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export default prisma
export type { PrismaClientSingleton }
