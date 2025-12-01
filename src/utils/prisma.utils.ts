// import { ENV } from '@/config/env.config';
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'], // detailed logs
//   });

// if (ENV.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
