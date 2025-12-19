import { QueryAuditLogDto } from '../../dto/query-audit-log.dto';

export class GetAuditLogsQuery {
  constructor(public readonly dto: QueryAuditLogDto) {}
}
