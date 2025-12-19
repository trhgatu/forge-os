import { AuditLog } from '../../infrastructure/schemas/sys-audit-log.schema';
import { CreateAuditLogDto } from '../../dto/create-audit-log.dto';

export abstract class AuditLogRepository {
  abstract create(dto: CreateAuditLogDto): Promise<AuditLog>;
  abstract findAll(query: any): Promise<any>;
}
