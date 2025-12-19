import { IsOptional, IsString } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class AuditLogQueryDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  userId?: string;
}
