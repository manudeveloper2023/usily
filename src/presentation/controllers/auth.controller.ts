import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/application/use-cases/register-user-use-case';
import { UserRegisterRequestDTO } from '../requests/user-register.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() userRegisterRequestDTO: UserRegisterRequestDTO) {
    const user = await this.registerUserUseCase.execute(userRegisterRequestDTO);
    return {
      message: 'User registered successfully',
      user,
    };
  }
}
