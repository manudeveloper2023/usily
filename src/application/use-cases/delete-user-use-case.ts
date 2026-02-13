import { Inject } from '@nestjs/common';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import { TOKENS } from 'src/infrastructure/constants/tokens';

export class DeleteUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.destroy(id);
  }
}
