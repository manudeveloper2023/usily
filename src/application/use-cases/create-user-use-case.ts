import { Inject } from '@nestjs/common';
import { CreateUserCommand } from '../commands/create-user-command';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import { User } from 'src/domain/entities/user';
import { UserResponseDTO } from 'src/presentation/responses/user.response';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import * as bcrypt from 'bcrypt';

export class CreateUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserResponseDTO> {
    const { email, name, password } = command;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.store(
      new User(name, email, hashPassword),
    );
    return new UserResponseDTO(newUser.name, newUser.email, newUser.id);
  }
}
