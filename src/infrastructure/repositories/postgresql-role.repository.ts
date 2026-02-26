import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleRepository } from 'src/domain/interfaces/role.repository';
import { Role } from 'src/domain/entities/role';

@Injectable()
export class PostgresqlRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findRolesByIds(roleIds: number[]): Promise<Role[]> {
    return this.prisma.role
      .findMany({
        where: {
          id: {
            in: roleIds,
          },
        },
      })
      .then((roles) =>
        roles.map((role) => new Role(role.id.toString(), role.name)),
      );
  }
  async findRolesByEmail(email: string): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        users: {
          some: {
            email: email,
          },
        },
      },
    });
    return roles.map((role) => new Role(role.id.toString(), role.name));
  }
}
