import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTransactionsQuery } from './get-transactions.query';
import { WealthRepository } from '../../../domain/wealth.repository';
import { FinancialTransaction } from '../../../domain/entities/financial-transaction.entity';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsHandler implements IQueryHandler<
  GetTransactionsQuery,
  FinancialTransaction[]
> {
  constructor(private readonly wealthRepo: WealthRepository) {}

  async execute(query: GetTransactionsQuery): Promise<FinancialTransaction[]> {
    return this.wealthRepo.findTransactions(query.userId, query.filters);
  }
}
