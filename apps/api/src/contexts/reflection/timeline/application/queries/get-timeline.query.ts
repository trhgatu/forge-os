import { QueryTimelineDto } from '../../presentation/dto/query-timeline.dto';

export class GetTimelineQuery {
  constructor(public readonly query: QueryTimelineDto) {}
}
