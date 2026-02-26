import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import { AddRoleToUserCommand } from '../commands/add-role-to-user-command';
import { UserResponseDTO } from 'src/presentation/responses/user.response';
import type { UserRepository } from 'src/domain/interfaces/user.repository';
import type { RoleRepository } from 'src/domain/interfaces/role.repository';
import { RoleType } from 'src/domain/entities/role';

const roleHierarchy: Record<RoleType, RoleType[]> = {
  [RoleType.ADMIN]: [RoleType.USER],
  [RoleType.USER]: [],
};

@Injectable()
export class UpdateRolesToUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(TOKENS.ROLE_REPOSITORY) private roleRepository: RoleRepository,
  ) {}

  async execute(command: AddRoleToUserCommand): Promise<UserResponseDTO> {
    const { roleIds } = command;
    const performedBy = command.performedBy;

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

    const currentUserRoles =
      await this.roleRepository.findRolesByEmail(performedBy);
    const currentRoleNames = currentUserRoles.map(
      (role) => role.name as RoleType,
    );

    const newRoleNames = roles.map((role) => role.name as RoleType);

    if (!this.canAssignRole(currentRoleNames, newRoleNames)) {
      throw new ForbiddenException(
        'You do not have permission to assign these roles.',
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

  private canAssignRole(
    currentRoles: RoleType[],
    newRoles: RoleType[],
  ): boolean {
    const assignableRoles = new Set<RoleType>();

    for (const role of currentRoles) {
      const allowedRoles = roleHierarchy[role];
      allowedRoles.forEach((r) => assignableRoles.add(r));
    }

    return newRoles.every((role) => assignableRoles.has(role));
  }
}
