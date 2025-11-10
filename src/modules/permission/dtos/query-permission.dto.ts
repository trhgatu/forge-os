import { IsOptional, IsString } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class QueryPermissionDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}
