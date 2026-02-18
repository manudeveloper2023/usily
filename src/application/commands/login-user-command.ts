import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserCommand {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
