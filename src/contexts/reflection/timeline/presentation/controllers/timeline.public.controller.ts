import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { QueryTimelineDto } from '../dto/query-timeline.dto';
import { GetTimelineQuery } from '../../application/queries/get-timeline.query';

@Controller('timeline')
export class TimelinePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getTimeline(@Query() query: QueryTimelineDto) {
    return this.queryBus.execute(new GetTimelineQuery(query));
  }
}
