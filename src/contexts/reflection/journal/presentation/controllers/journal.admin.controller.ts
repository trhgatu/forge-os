import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@modules/auth/guards';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { QueryJournalDto } from '../dto/query-journal.dto';
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

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/journals')
export class JournalAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_MEMORY)
  create(@Body() dto: CreateJournalDto) {
    return this.commandBus.execute(new CreateJournalCommand(dto));
  }

  @Get()
  @Permissions(PermissionEnum.READ_MEMORY)
  findAll(@Query() query: QueryJournalDto) {
    return this.queryBus.execute(
      new GetAllJournalsQuery({
        page: query.page ? Number(query.page) : undefined,
        limit: query.limit ? Number(query.limit) : undefined,
        tags: query.tags,
        mood: query.mood,
        keyword: query.keyword,
        isDeleted: query.isDeleted ? query.isDeleted === 'true' : undefined,
      }),
    );
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_MEMORY)
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetJournalByIdQuery(JournalId.create(id)));
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_MEMORY)
  update(@Param('id') id: string, @Body() dto: UpdateJournalDto) {
    return this.commandBus.execute(
      new UpdateJournalCommand(JournalId.create(id), dto),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_MEMORY)
  delete(@Param('id') id: string, @Query('hard') hard?: 'true') {
    const journalId = JournalId.create(id);
    return hard === 'true'
      ? this.commandBus.execute(new DeleteJournalCommand(journalId))
      : this.commandBus.execute(new SoftDeleteJournalCommand(journalId));
  }

  @Patch(':id/restore')
  @Permissions(PermissionEnum.RESTORE_MEMORY)
  restore(@Param('id') id: string) {
    return this.commandBus.execute(
      new RestoreJournalCommand(JournalId.create(id)),
    );
  }
}
