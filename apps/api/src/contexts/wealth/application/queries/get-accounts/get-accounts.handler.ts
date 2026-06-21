import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAccountsQuery } from './get-accounts.query';
import { WealthRepository } from '../../../domain/wealth.repository';
import { FinancialAccount } from '../../../domain/entities/financial-account.entity';

@QueryHandler(GetAccountsQuery)
export class GetAccountsHandler implements IQueryHandler<GetAccountsQuery, FinancialAccount[]> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
  ) {}

  async execute(query: GetAccountsQuery): Promise<FinancialAccount[]> {
    return this.wealthRepo.findAccountsByUserId(query.userId);
  }
}
