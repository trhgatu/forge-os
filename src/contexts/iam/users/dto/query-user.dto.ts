import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { QueryPaginationDto } from '@shared/dtos';

export class QueryUserDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  isDeleted?: boolean;
}
