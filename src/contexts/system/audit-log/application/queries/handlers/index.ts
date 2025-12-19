import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAuditLogsQuery } from '../index';
import { AuditLogRepository } from '../../ports/audit-log.repository';

@QueryHandler(GetAuditLogsQuery)
export class GetAuditLogsHandler implements IQueryHandler<GetAuditLogsQuery> {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async execute(query: GetAuditLogsQuery) {
    return this.auditLogRepository.findAll(query.dto);
  }
}
