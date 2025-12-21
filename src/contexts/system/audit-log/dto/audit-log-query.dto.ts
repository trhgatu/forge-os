import { IsOptional, IsMongoId } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class AuditLogQueryDto extends QueryPaginationDto {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
