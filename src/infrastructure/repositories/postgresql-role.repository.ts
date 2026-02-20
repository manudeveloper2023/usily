import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleRepository } from 'src/domain/interfaces/role.repository';
import { Role } from 'src/domain/entities/role';

@Injectable()
export class PostgresqlRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findRolesByEmail(email: string): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        users: {
          some: {
            email,
          },
        },
      },
    });
    return roles.map((role) => new Role(role.id.toString(), role.name));
  }
}
