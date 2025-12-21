import { CreateAuditLogDto } from '../../dto/create-audit-log.dto';

export class CreateAuditLogCommand {
  constructor(public readonly dto: CreateAuditLogDto) {}
}
