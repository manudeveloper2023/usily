import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { CreateUserCommand } from 'src/application/commands/create-user-command';
import { AllUsersUseCase } from 'src/application/use-cases/all-users-use-case';
import { CreateUserUseCase } from 'src/application/use-cases/create-user-use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user-use-case';
import { Logger } from '../decorators/logger.decorator';
import { Roles } from '../decorators/role.decorator';
import { RoleType } from 'src/domain/entities/role';
import { AddUserRoleRequestDTO } from '../requests/add-role-request';
import { AddRoleToUserCommand } from 'src/application/commands/add-role-to-user-command';
import { UpdateRolesToUserUseCase } from 'src/application/use-cases/update-roles-to-user-use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly allUsersUseCase: AllUsersUseCase,
    private readonly updateRolesToUserUseCase: UpdateRolesToUserUseCase,
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
  @Roles(RoleType.ADMIN)
  @HttpCode(204)
  async delete(@Param('id') id: string, @Req() req: Request) {
    if (req['userId'] === Number(id)) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    await this.deleteUserUseCase.execute(id);
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

  @Post(':id/roles')
  async addRolesToUser(
    @Param('id') userId: string,
    @Body() request: AddUserRoleRequestDTO,
    @Req() req: Request,
  ) {
    const { roleIds } = request;
    const performedBy = req['subject'];
    const command = new AddRoleToUserCommand(userId, roleIds, performedBy);

    return await this.updateRolesToUserUseCase.execute(command);
  }
}
