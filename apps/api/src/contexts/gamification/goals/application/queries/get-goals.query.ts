import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GoalsService } from '../goals.service';

export class GetGoalsQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetGoalsQuery)
export class GetGoalsHandler implements IQueryHandler<GetGoalsQuery> {
  constructor(private readonly goalsService: GoalsService) {}

  async execute(query: GetGoalsQuery) {
    const { userId } = query;
    return this.goalsService.getUserGoals(userId);
  }
}
