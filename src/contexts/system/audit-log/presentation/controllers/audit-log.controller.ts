import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuditLogQueryDto } from '../../dto/audit-log-query.dto';
import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { GetAuditLogsQuery } from '../../application/queries';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly queryBus: QueryBus) {}

  @Permissions(PermissionEnum.READ_AUDIT_LOG)
  @Get()
  async findAll(@Query() query: AuditLogQueryDto) {
    return this.queryBus.execute(new GetAuditLogsQuery(query));
  }
}
