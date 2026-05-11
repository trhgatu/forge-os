import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryJournalDto, JournalResponse } from '../dto';
import {
  GetAllJournalsForPublicQuery,
  GetJournalByIdForPublicQuery,
} from '../../application/queries';
import { JournalPresenter } from '../presenters/journal.presenter';
import { JournalId } from '../../domain/value-objects/journal-id.vo';

@ApiTags('Reflection / Journal (Public)')
@Controller('public/journals')
export class JournalPublicController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly presenter: JournalPresenter,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all public journal entries' })
  async findAll(@Query() queryDto: QueryJournalDto) {
    const filter = this.presenter.toFilter(queryDto);
    const result = await this.queryBus.execute(
      new GetAllJournalsForPublicQuery(filter),
    );
    return {
      ...result,
      data: this.presenter.toResponseArray(result.data),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a public journal entry by ID' })
  @ApiResponse({ status: 200, type: JournalResponse })
  async findOne(@Param('id') id: string) {
    const journal = await this.queryBus.execute(
      new GetJournalByIdForPublicQuery(JournalId.fromString(id)),
    );
    return this.presenter.toResponse(journal);
  }
}
