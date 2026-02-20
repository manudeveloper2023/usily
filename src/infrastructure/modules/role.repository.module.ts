import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TOKENS } from '../constants/tokens';
import { PostgresqlRoleRepository } from '../repositories/postgresql-role.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: TOKENS.ROLE_REPOSITORY,
      useClass: PostgresqlRoleRepository,
    },
  ],
  exports: [TOKENS.ROLE_REPOSITORY],
})
export class RoleRepositoryModule {}
