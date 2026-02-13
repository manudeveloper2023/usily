import { Injectable, Module } from '@nestjs/common';
import { User } from 'src/domain/entities/user';
import { UserRepository } from 'src/domain/interfaces/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TOKENS } from '../constants/tokens';

@Injectable()
export class PostgresqlUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async destroy(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
  async store(user: User): Promise<User> {
    const data = user.toPersistence();
    const newUser = await this.prisma.user.create({
      data,
    });
    return new User(newUser.name, newUser.email, newUser.password, newUser.id);
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
}

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: TOKENS.USER_REPOSITORY, useClass: PostgresqlUserRepository },
  ],
  exports: [TOKENS.USER_REPOSITORY],
})
export class UserRepositoryModule {}
