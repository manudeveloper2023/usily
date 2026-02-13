import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';

export class UserRegisterRequestDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
