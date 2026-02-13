import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user-use-case';
import { UserRepositoryModule } from 'src/infrastructure/repositories/postgresql-user.repository';
import { UserController } from '../controllers/user.controller';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user-use-case';
import { AllUsersUseCase } from 'src/application/use-cases/all-users-use-case';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [CreateUserUseCase, DeleteUserUseCase, AllUsersUseCase],
  exports: [CreateUserUseCase, DeleteUserUseCase, AllUsersUseCase],
})
export class UserModule {}
