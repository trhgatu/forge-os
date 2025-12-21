// src/modules/role/dtos/query-role.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { QueryPaginationDto } from '@shared/dtos';

export class QueryRoleDto extends QueryPaginationDto {
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
