import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserCommand {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
