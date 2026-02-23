import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { QueryJournalDto } from '../dto';

import {
  GetAllJournalsForPublicQuery,
  GetJournalByIdForPublicQuery,
} from '../../application/queries';

import { JournalId } from '../../domain/value-objects/journal-id.vo';

@Controller('journals')
export class JournalPublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll(@Query() query: QueryJournalDto) {
    return this.queryBus.execute(new GetAllJournalsForPublicQuery(query));
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(
      new GetJournalByIdForPublicQuery(JournalId.create(id)),
    );
  }
}
