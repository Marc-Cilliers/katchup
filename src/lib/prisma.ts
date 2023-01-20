import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
const GLOBAL = global as any;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!GLOBAL.prisma) {
    GLOBAL.prisma = new PrismaClient();
  }
  prisma = GLOBAL.prisma;
}

export default prisma;
