import { AuditLogQueryDto } from '../../dto/audit-log-query.dto';

export class GetAuditLogsQuery {
  constructor(public readonly dto: AuditLogQueryDto) {}
}
