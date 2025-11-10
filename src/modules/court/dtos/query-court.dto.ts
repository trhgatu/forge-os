// src/modules/court/dtos/query-court.dto.ts
import {
  IsOptional,
  IsEnum,
  IsString,
  IsMongoId,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QueryPaginationDto } from '@shared/dtos';
import { CourtStatus, SportType } from '@shared/enums';

export class QueryCourtDto extends QueryPaginationDto {
  @IsOptional()
  @IsEnum(CourtStatus)
  status?: CourtStatus;

  @IsOptional()
  @IsEnum(SportType)
  sportType?: SportType;

  @IsOptional()
  @IsMongoId()
  venueId?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  isDeleted?: boolean;
}
