import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from 'src/domain/entities/role';

export const ROLE_KEY = 'roles';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLE_KEY, roles);
