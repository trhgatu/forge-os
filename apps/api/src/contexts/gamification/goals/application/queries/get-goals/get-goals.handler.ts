import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGoalsQuery } from './get-goals.query';
import { GoalsService } from '../../goals.service';

@QueryHandler(GetGoalsQuery)
export class GetGoalsHandler implements IQueryHandler<GetGoalsQuery> {
  constructor(private readonly goalsService: GoalsService) {}

  async execute(query: GetGoalsQuery) {
    const { userId } = query;
    return this.goalsService.getUserGoals(userId);
  }
}
