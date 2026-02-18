import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUserUseCase } from 'src/application/use-cases/register-user-use-case';
import { UserRepositoryModule } from 'src/infrastructure/repositories/postgresql-user.repository';
import { LoginUserUseCase } from 'src/application/use-cases/login-user-use-case';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserRepositoryModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [RegisterUserUseCase, LoginUserUseCase],
  controllers: [AuthController],
  exports: [RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}
