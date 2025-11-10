import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsMongoId,
  IsArray,
  IsLatitude,
  IsLongitude,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SportType, VenueStatus } from '@shared/enums';

class CoordinatesDto {
  @IsLatitude()
  lat!: number;

  @IsLongitude()
  lng!: number;
}

export class CreateVenueDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates?: CoordinatesDto;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsNotEmpty()
  @IsEnum(SportType)
  sportType!: SportType;

  @IsOptional()
  @IsEnum(VenueStatus)
  status?: VenueStatus;

  @IsOptional()
  @IsNumber()
  numOfCourts?: number;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  openHour?: string;

  @IsOptional()
  @IsString()
  closeHour?: string;

  @IsOptional()
  @IsNumber()
  pricePerHour?: number;

  @IsOptional()
  @IsMongoId()
  ownerId?: string;
}
