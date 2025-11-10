import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsMongoId()
  roleId!: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phoneNumber?: string;
}
