import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuditLogCommand } from '../create-audit-log.command';
import { AuditLogRepository } from '../../ports/audit-log.repository';

@CommandHandler(CreateAuditLogCommand)
export class CreateAuditLogHandler implements ICommandHandler<CreateAuditLogCommand> {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async execute(command: CreateAuditLogCommand) {
    return this.auditLogRepository.create(command.dto);
  }
}
