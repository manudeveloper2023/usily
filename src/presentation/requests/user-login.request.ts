import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginRequestDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
