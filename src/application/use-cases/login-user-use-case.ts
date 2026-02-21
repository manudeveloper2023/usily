import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import { LoginUserCommand } from '../commands/login-user-command';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(loginUserCommand: LoginUserCommand): Promise<string> {
    const { email, password } = loginUserCommand;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.getPasswordHash(),
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      subject: user.email,
    };

    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
