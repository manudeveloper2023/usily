import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env['DATABASE_URL'],
});
const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: 'ADMIN',
      },
      {
        name: 'USER',
      },
    ],
  });

  await prisma.user.create({
    data: {
      name: 'User',
      email: 'user@usily.com',
      password: '$2a$12$AuYaoofywdUjDKIo/.iKV.4KaCVBFqBkB1BKdMQY8ERBXGCMwNYYK',
      roles: {
        connect: {
          name: 'USER',
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@usily.com',
      password: '$2a$12$S3gnCEg/z/Are8hh8H0r1.qSDqEnvL2dqTVzLwAZgWgEtl140Hdmy',
      roles: {
        connect: {
          name: 'ADMIN',
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
