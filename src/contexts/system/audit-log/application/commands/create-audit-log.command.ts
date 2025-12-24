import { CreateAuditLogDto } from '../../presentation/dto/create-audit-log.dto';

export class CreateAuditLogCommand {
  constructor(public readonly dto: CreateAuditLogDto) {}
}
