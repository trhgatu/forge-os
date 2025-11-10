import { SportStatus } from '@shared/enums';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsEnum(SportStatus)
  status?: SportStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
