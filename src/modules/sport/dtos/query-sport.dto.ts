import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';
import { SportStatus } from '@shared/enums';

export class QuerySportDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsEnum(SportStatus)
  status?: SportStatus;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
