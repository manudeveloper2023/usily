import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/application/use-cases/register-user-use-case';
import { UserRegisterRequestDTO } from '../requests/user-register.request';
import { UserLoginRequestDTO } from '../requests/user-login.request';
import { LoginUserUseCase } from 'src/application/use-cases/login-user-use-case';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() userRegisterRequestDTO: UserRegisterRequestDTO) {
    const user = await this.registerUserUseCase.execute(userRegisterRequestDTO);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() userLoginRequestDTO: UserLoginRequestDTO) {
    const token = await this.loginUserUseCase.execute(userLoginRequestDTO);
    return {
      message: 'User logged in successfully',
      access_token: token,
    };
  }
}
