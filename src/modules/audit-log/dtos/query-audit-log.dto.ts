import { IsOptional, IsMongoId } from 'class-validator';
import { QueryPaginationDto } from '@shared/dtos';

export class QueryAuditLogDto extends QueryPaginationDto {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
