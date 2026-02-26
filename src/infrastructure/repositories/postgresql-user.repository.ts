import { Injectable, Module } from '@nestjs/common';
import { User } from 'src/domain/entities/user';
import { UserRepository } from 'src/domain/interfaces/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostgresqlUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user.name, user.email, user.password, user.id);
  }
  async destroy(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
  async store(user: User): Promise<User> {
    const data = user.toPersistence();
    const roleIds = data.roleIds ?? [];
    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roles: {
          connect: roleIds.map((roleId) => ({ id: roleId })),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        roles: {
          select: {
            id: true,
          },
        },
      },
    });

    return new User(
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.id,
      newUser.roles.map((role) => role.id),
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return null;
    }
    return new User(user.name, user.email, user.password, user.id);
  }

  async findAll(): Promise<User[]> {
    const user = await this.prisma.user.findMany();
    return user.map(
      (user) => new User(user.name, user.email, user.password, user.id),
    );
  }

  async update(user: User): Promise<User> {
    const data = user.toPersistence();
    const roleIds = data.roleIds ?? [];
    const updatedUser = await this.prisma.user.update({
      where: {
        id: Number(user.id),
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roles: {
          set: roleIds.map((roleId) => ({ id: roleId })),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        roles: {
          select: {
            id: true,
          },
        },
      },
    });

    return new User(
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.id,
      updatedUser.roles.map((role) => role.id),
    );
  }
}
