import { IsOptional, IsEnum, IsString } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';
import { VenueStatus, SportType } from '@shared/enums';

export class QueryVenueDto extends QueryPaginationDto {
  @IsOptional()
  @IsEnum(VenueStatus)
  status?: VenueStatus;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(SportType)
  sportType?: SportType;

  @IsOptional()
  isDeleted?: boolean;
}
