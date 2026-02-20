import { Module } from '@nestjs/common';
import { RoleRepositoryModule } from 'src/infrastructure/modules/role.repository.module';

@Module({
  imports: [RoleRepositoryModule],
  exports: [RoleRepositoryModule],
})
export class RoleModule {}
