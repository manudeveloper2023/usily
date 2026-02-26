import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import { AddRoleToUserCommand } from '../commands/add-role-to-user-command';
import { UserResponseDTO } from 'src/presentation/responses/user.response';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import type { RoleRepository } from 'src/domain/interfaces/role.repository';

@Injectable()
export class UpdateRolesToUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(TOKENS.ROLE_REPOSITORY) private roleRepository: RoleRepository,
  ) {}

  async execute(command: AddRoleToUserCommand): Promise<UserResponseDTO> {
    const { roleIds } = command;
    const roles = await this.roleRepository.findRolesByIds(roleIds);

    const foundRoleIds = new Set(roles.map((role) => role.id));
    const missingRoles = roleIds.filter(
      (id) => !foundRoleIds.has(id.toString()),
    );

    if (missingRoles.length > 0) {
      throw new NotFoundException(
        `Roles with IDs ${missingRoles.join(', ')} not found.`,
      );
    }

    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.updateRoles(roleIds);

    const updatedUser = await this.userRepository.update(user);

    return new UserResponseDTO(
      updatedUser.name,
      updatedUser.email,
      updatedUser.id,
    );
  }
}
