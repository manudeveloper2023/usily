import { Module } from '@nestjs/common';
import { UserModule } from './presentation/modules/user.module';
import { AuthModule } from './presentation/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthJwtGuard } from './presentation/guards/auth-jwt.guard';
import { LoggerInterceptor } from './presentation/interceptors/logger.interceptor';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    { provide: APP_GUARD, useClass: AuthJwtGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
