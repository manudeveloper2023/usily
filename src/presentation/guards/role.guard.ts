import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { TOKENS } from 'src/infrastructure/constants/tokens';
import type { RoleRepository } from 'src/domain/interfaces/role.repository';
import { RoleType } from 'src/domain/entities/role';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(TOKENS.ROLE_REPOSITORY)
    private roleRepository: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const subject = request['subject'];
    const roles = await this.roleRepository.findRolesByEmail(subject);

    if (!requiredRoles) {
      return true;
    }

    const existRoleInUser = requiredRoles.some((role: RoleType) =>
      roles.map((r) => r.name.toUpperCase()).includes(role.toUpperCase()),
    );
    if (!existRoleInUser) {
      throw new UnauthorizedException(
        'User does not have the required role(s) to access this resource',
      );
    }

    return true;
  }
}
