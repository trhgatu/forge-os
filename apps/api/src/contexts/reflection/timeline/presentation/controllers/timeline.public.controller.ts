import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { QueryTimelineDto } from '../dto/query-timeline.dto';
import { GetTimelineQuery } from '../../application/queries';
import { TimelinePresenter } from '../presenters/timeline.presenter';
import { PaginatedResponse } from '@shared/types';
import { TimelineResponse } from '../dto/timeline.response';

@Controller('timeline')
export class TimelinePublicController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getTimeline(@Query() query: QueryTimelineDto) {
    const result = await this.queryBus.execute<
      GetTimelineQuery,
      PaginatedResponse<TimelineResponse>
    >(new GetTimelineQuery(query));
    return TimelinePresenter.toResponse(result);
  }
}
