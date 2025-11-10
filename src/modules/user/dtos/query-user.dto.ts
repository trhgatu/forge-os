import { IsString, IsOptional } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class QueryUserDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsString()
  keyword?: string;
}
