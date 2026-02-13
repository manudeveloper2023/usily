import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import { UserResponseDTO } from 'src/presentation/responses/user.response';
import { RegisterUserCommand } from '../commands/register-user-command';
import { User } from 'src/domain/entities/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand): Promise<UserResponseDTO> {
    const { email, name, password } = command;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.store(
      new User(name, email, hashPassword),
    );
    return new UserResponseDTO(newUser.name, newUser.email, newUser.id);
  }
}
