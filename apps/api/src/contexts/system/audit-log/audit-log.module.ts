import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AuditLog,
  AuditLogSchema,
} from './infrastructure/schemas/sys-audit-log.schema';
import { AuditLogController } from './presentation/controllers/audit-log.controller';
import { SharedModule } from '@shared/shared.module';
import { AuditLogRepository } from './application/ports/audit-log.repository';
import { MongoAuditLogRepository } from './infrastructure/repositories/mongo-audit-log.repository';
import { CreateAuditLogHandler } from './application/commands/handlers';
import { GetAuditLogsHandler } from './application/queries/handlers';

const CommandHandlers = [CreateAuditLogHandler];
const QueryHandlers = [GetAuditLogsHandler];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuditLog.name, schema: AuditLogSchema },
    ]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [AuditLogController],
  providers: [
    {
      provide: AuditLogRepository,
      useClass: MongoAuditLogRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [AuditLogRepository],
})
export class AuditLogModule {}
