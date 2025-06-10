// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Evita múltiples instancias de PrismaClient en desarrollo
  // si el módulo se recarga (HMR)
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
