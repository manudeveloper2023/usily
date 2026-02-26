import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user-use-case';
import { UserRepositoryModule } from 'src/infrastructure/modules/user.repository.module';
import { UserController } from '../controllers/user.controller';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user-use-case';
import { AllUsersUseCase } from 'src/application/use-cases/all-users-use-case';
import { AddRoleToUserUseCase } from 'src/application/use-cases/update-roles-to-user-use-case';
import { RoleRepositoryModule } from 'src/infrastructure/modules/role.repository.module';

@Module({
  imports: [UserRepositoryModule, RoleRepositoryModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    AllUsersUseCase,
    AddRoleToUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    DeleteUserUseCase,
    AllUsersUseCase,
    AddRoleToUserUseCase,
  ],
})
export class UserModule {}
