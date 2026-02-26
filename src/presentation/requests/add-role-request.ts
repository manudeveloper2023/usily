import { IsNotEmpty } from 'class-validator';

export class AddUserRoleRequestDTO {
  @IsNotEmpty()
  roleIds: number[];
}
