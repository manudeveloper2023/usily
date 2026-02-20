import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TOKENS } from '../constants/tokens';
import { PostgresqlUserRepository } from '../repositories/postgresql-user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: TOKENS.USER_REPOSITORY, useClass: PostgresqlUserRepository },
  ],
  exports: [TOKENS.USER_REPOSITORY],
})
export class UserRepositoryModule {}
