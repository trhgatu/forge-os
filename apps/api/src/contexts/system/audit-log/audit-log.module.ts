import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuditLogController } from './presentation/controllers/audit-log.controller';
import { SharedModule } from '@shared/shared.module';
import { AuditLogRepository } from './application/ports/audit-log.repository';
import { PrismaAuditLogRepository } from './infrastructure/repositories/prisma-audit-log.repository';
import { CreateAuditLogHandler } from './application/commands/handlers';
import { GetAuditLogsHandler } from './application/queries/handlers';

const CommandHandlers = [CreateAuditLogHandler];
const QueryHandlers = [GetAuditLogsHandler];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [AuditLogController],
  providers: [
    {
      provide: AuditLogRepository,
      useClass: PrismaAuditLogRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [AuditLogRepository],
})
export class AuditLogModule {}
