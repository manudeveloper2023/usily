import { ArrayNotEmpty, IsArray, IsInt, IsPositive } from 'class-validator';

export class AddUserRoleRequestDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  roleIds: number[];
}
