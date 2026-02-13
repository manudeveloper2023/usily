import { Inject } from '@nestjs/common';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import { UserResponseDTO } from 'src/presentation/responses/user.response';

export class AllUsersUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserResponseDTO[]> {
    const users = (await this.userRepository.findAll()).map((user) => {
      return new UserResponseDTO(user.name, user.email, user.id);
    });

    return users;
  }
}
