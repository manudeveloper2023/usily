import { Role } from '../entities/role';

export interface RoleRepository {
  findRolesByEmail(email: string): Promise<Role[]>;
  findRolesByIds(roleIds: number[]): Promise<Role[]>;
}
