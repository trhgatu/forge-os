import { IsEmail, IsNotEmpty, MinLength, IsMongoId } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsMongoId({ message: 'Invalid roleId format' })
  roleId!: string;
}
