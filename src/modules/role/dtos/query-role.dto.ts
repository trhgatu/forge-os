// src/modules/role/dtos/query-role.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class QueryRoleDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}
