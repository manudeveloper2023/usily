import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserCommand } from 'src/application/commands/create-user-command';
import { AllUsersUseCase } from 'src/application/use-cases/all-users-use-case';
import { CreateUserUseCase } from 'src/application/use-cases/create-user-use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user-use-case';
import { Logger } from '../decorators/logger.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly allUsersUseCase: AllUsersUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() user: CreateUserCommand, @Res() res: Response) {
    const newUser = await this.createUserUseCase.execute(user);
    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.deleteUserUseCase.execute(id);
    return res.status(204).json({
      message: 'User deleted successfully',
    });
  }

  @Get()
  @HttpCode(200)
  @Logger()
  async findAll(@Res() res: Response) {
    const users = await this.allUsersUseCase.execute();

    if (users.length === 0) {
      return res.status(200).json({
        message: 'No users not found',
      });
    }
    return res.status(200).json({
      message: 'Users retrieved successfully',
      users,
    });
  }
}
