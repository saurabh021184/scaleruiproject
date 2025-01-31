import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

// console.log(prisma._engine.config);
// console.log(prisma._clientVersion);

// async function main() {
//     const users = await prisma.user.findMany();
//     console.log(users);
//   }
  

//   main().catch((e) => {
//     console.error(e);
//   }).finally(async () => {
//     await prisma.$disconnect();
//   });


export default prisma;