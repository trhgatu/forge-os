import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBudgetsQuery } from './get-budgets.query';
import { WealthRepository } from '../../../domain/wealth.repository';
import { Budget } from '../../../domain/entities/budget.entity';

@QueryHandler(GetBudgetsQuery)
export class GetBudgetsHandler implements IQueryHandler<GetBudgetsQuery, Budget[]> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
  ) {}

  async execute(query: GetBudgetsQuery): Promise<Budget[]> {
    return this.wealthRepo.findBudgetsByUserId(query.userId);
  }
}
