import { Module } from '@nestjs/common';
import { UserModule } from './presentation/modules/user.module';
import { AuthModule } from './presentation/modules/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
