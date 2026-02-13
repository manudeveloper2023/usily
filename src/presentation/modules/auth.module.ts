import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUserUseCase } from 'src/application/use-cases/register-user-use-case';
import { UserRepositoryModule } from 'src/infrastructure/repositories/postgresql-user.repository';

@Module({
  imports: [UserRepositoryModule],
  providers: [RegisterUserUseCase],
  controllers: [AuthController],
  exports: [RegisterUserUseCase],
})
export class AuthModule {}
