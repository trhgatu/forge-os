// src/modules/court/dtos/create-court.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsMongoId,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SportType, CourtStatus } from '@shared/enums';

export class CreateCourtDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsMongoId()
  venueId!: string;

  @IsNotEmpty()
  @IsEnum(SportType)
  sportType!: SportType;

  @IsOptional()
  @IsEnum(CourtStatus)
  status?: CourtStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pricePerHour!: number;

  @IsOptional()
  @IsBoolean()
  isIndoor?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPlayers?: number;
}
