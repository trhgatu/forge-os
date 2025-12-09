import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { QueryJournalDto } from '../dto/query-journal.dto';
import { CreateJournalDto } from '../dto/create-journal.dto';
import {
  GetAllJournalsQuery,
  GetJournalByIdQuery,
} from '../../application/queries';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { CreateJournalCommand } from '../../application/commands';

@Controller('journals')
export class JournalPublicController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  findAll(@Query() query: QueryJournalDto) {
    return this.queryBus.execute(
      new GetAllJournalsQuery({
        page: query.page ? Number(query.page) : undefined,
        limit: query.limit ? Number(query.limit) : undefined,
        tags: query.tags,
        mood: query.mood,
        keyword: query.keyword,
        isDeleted: false,
      }),
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetJournalByIdQuery(JournalId.create(id)));
  }

  @Post()
  create(@Body() dto: CreateJournalDto) {
    return this.commandBus.execute(new CreateJournalCommand(dto));
  }
}
