import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { CreateJournalDto, UpdateJournalDto, QueryJournalDto, JournalResponse } from '../dto';
import {
  CreateJournalCommand,
  UpdateJournalCommand,
  SoftDeleteJournalCommand,
  RestoreJournalCommand,
} from '../../application/commands';
import { GetAllJournalsQuery, GetJournalByIdQuery } from '../../application/queries';
import { JournalPresenter } from '../presenters/journal.presenter';

@ApiTags('Reflection / Journal (Admin)')
@ApiBearerAuth()
@Controller('admin/journals')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class JournalAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: JournalPresenter,
  ) {}

  @Post()
  @Permissions('reflection:journal:create')
  @ApiOperation({ summary: 'Create a new journal entry' })
  @ApiResponse({ status: 201, type: JournalResponse })
  async create(@Body() dto: CreateJournalDto) {
    const journal = await this.commandBus.execute(new CreateJournalCommand(dto));
    return this.presenter.toResponse(journal);
  }

  @Get()
  @Permissions('reflection:journal:read')
  @ApiOperation({ summary: 'Get all journal entries (paginated)' })
  async findAll(@Query() queryDto: QueryJournalDto) {
    const filter = this.presenter.toFilter(queryDto);
    const result = await this.queryBus.execute(new GetAllJournalsQuery(filter));
    return {
      ...result,
      data: this.presenter.toResponseArray(result.data),
    };
  }

  @Get(':id')
  @Permissions('reflection:journal:read')
  @ApiOperation({ summary: 'Get a journal entry by ID' })
  @ApiResponse({ status: 200, type: JournalResponse })
  async findOne(@Param('id') id: string) {
    const journal = await this.queryBus.execute(new GetJournalByIdQuery(JournalId.fromString(id)));
    return this.presenter.toResponse(journal);
  }

  @Put(':id')
  @Permissions('reflection:journal:update')
  @ApiOperation({ summary: 'Update a journal entry' })
  @ApiResponse({ status: 200, type: JournalResponse })
  async update(@Param('id') id: string, @Body() dto: UpdateJournalDto) {
    const journal = await this.commandBus.execute(
      new UpdateJournalCommand(JournalId.fromString(id), dto),
    );
    return this.presenter.toResponse(journal);
  }

  @Delete(':id')
  @Permissions('reflection:journal:delete')
  @ApiOperation({ summary: 'Soft delete a journal entry' })
  async remove(@Param('id') id: string) {
    const journal = await this.commandBus.execute(
      new SoftDeleteJournalCommand(JournalId.fromString(id)),
    );
    return this.presenter.toResponse(journal);
  }

  @Post(':id/restore')
  @Permissions('reflection:journal:update')
  @ApiOperation({ summary: 'Restore a soft-deleted journal entry' })
  async restore(@Param('id') id: string) {
    const journal = await this.commandBus.execute(
      new RestoreJournalCommand(JournalId.fromString(id)),
    );
    return this.presenter.toResponse(journal);
  }
}
