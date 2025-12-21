import { AuditLog } from '../../domain/audit-log.entity';
import { CreateAuditLogDto } from '../../dto/create-audit-log.dto';

import { AuditLogQueryDto } from '../../dto/audit-log-query.dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

export abstract class AuditLogRepository {
  abstract create(dto: CreateAuditLogDto): Promise<AuditLog>;
  abstract findAll(query: AuditLogQueryDto): Promise<PaginatedResult<AuditLog>>;
}
