import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type GlobalThisWithPrisma = typeof globalThis & {
  prisma?: ReturnType<typeof prismaClientSingleton>;
};

const prisma = (globalThis as GlobalThisWithPrisma).prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  (globalThis as GlobalThisWithPrisma).prisma = prisma;
}