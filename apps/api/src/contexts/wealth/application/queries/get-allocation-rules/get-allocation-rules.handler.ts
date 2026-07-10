import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllocationRulesQuery } from './get-allocation-rules.query';
import { WealthRepository } from '../../../domain/wealth.repository';
import { AutoAllocationRule } from '../../../domain/entities/auto-allocation-rule.entity';

@QueryHandler(GetAllocationRulesQuery)
export class GetAllocationRulesHandler implements IQueryHandler<
  GetAllocationRulesQuery,
  AutoAllocationRule[]
> {
  constructor(private readonly wealthRepo: WealthRepository) {}

  async execute(query: GetAllocationRulesQuery): Promise<AutoAllocationRule[]> {
    return this.wealthRepo.findAllocationRulesByUserId(query.userId);
  }
}
