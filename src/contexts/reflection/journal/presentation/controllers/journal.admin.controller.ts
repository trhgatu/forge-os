import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateJournalDto, UpdateJournalDto, QueryJournalDto } from '../dto';

import {
  CreateJournalCommand,
  UpdateJournalCommand,
  DeleteJournalCommand,
  SoftDeleteJournalCommand,
  RestoreJournalCommand,
} from '../../application/commands';
import {
  GetAllJournalsQuery,
  GetJournalByIdQuery,
} from '../../application/queries';

import { JournalId } from '../../domain/value-objects/journal-id.vo';

import { JwtAuthGuard } from 'src/contexts/iam/auth/application/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/journals')
export class JournalAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_JOURNAL)
  create(@Body() dto: CreateJournalDto) {
    return this.commandBus.execute(new CreateJournalCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_JOURNAL)
  findAll(@Query() query: QueryJournalDto) {
    return this.queryBus.execute(new GetAllJournalsQuery(query));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_JOURNAL)
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetJournalByIdQuery(JournalId.create(id)));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_JOURNAL)
  update(@Param('id') id: string, @Body() dto: UpdateJournalDto) {
    return this.commandBus.execute(
      new UpdateJournalCommand(JournalId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_JOURNAL)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const journalId = JournalId.create(id);

    return hard === 'true'
      ? this.commandBus.execute(new DeleteJournalCommand(journalId))
      : this.commandBus.execute(new SoftDeleteJournalCommand(journalId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_JOURNAL)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(
      new RestoreJournalCommand(JournalId.create(id)),
    );
  }
}
