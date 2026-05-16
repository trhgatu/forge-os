import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { CreateJournalDto, UpdateJournalDto, QueryJournalDto, JournalResponse } from '../dto';
import {
  CreateJournalCommand,
  UpdateJournalCommand,
  SoftDeleteJournalCommand,
} from '../../application/commands';
import { GetAllJournalsQuery, GetJournalByIdQuery } from '../../application/queries';
import { JournalPresenter } from '../presenters/journal.presenter';

@ApiTags('Reflection / Journal')
@ApiBearerAuth()
@Controller('journals')
@UseGuards(JwtAuthGuard)
export class JournalController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: JournalPresenter,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new journal entry' })
  @ApiResponse({ status: 201, type: JournalResponse })
  async create(@Body() dto: CreateJournalDto, @User('id') userId: string) {
    const journal = await this.commandBus.execute(new CreateJournalCommand({ ...dto, userId }));
    return this.presenter.toResponse(journal);
  }

  @Get()
  @ApiOperation({ summary: 'Get my journal entries (paginated)' })
  async findAll(@Query() queryDto: QueryJournalDto, @User('id') userId: string) {
    const filter = this.presenter.toFilter(queryDto);
    const result = await this.queryBus.execute(new GetAllJournalsQuery({ ...filter, userId }));
    return {
      ...result,
      data: this.presenter.toResponseArray(result.data),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get my journal entry by ID' })
  @ApiResponse({ status: 200, type: JournalResponse })
  async findOne(@Param('id') id: string, @User('id') userId: string) {
    const journal = await this.queryBus.execute(
      new GetJournalByIdQuery(JournalId.fromString(id), userId),
    );
    return this.presenter.toResponse(journal);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update my journal entry' })
  @ApiResponse({ status: 200, type: JournalResponse })
  async update(@Param('id') id: string, @Body() dto: UpdateJournalDto, @User('id') userId: string) {
    const journal = await this.commandBus.execute(
      new UpdateJournalCommand(JournalId.fromString(id), { ...dto, userId }),
    );
    return this.presenter.toResponse(journal);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete my journal entry' })
  async remove(@Param('id') id: string, @User('id') userId: string) {
    const journal = await this.commandBus.execute(
      new SoftDeleteJournalCommand(JournalId.fromString(id), userId),
    );
    return this.presenter.toResponse(journal);
  }
}
