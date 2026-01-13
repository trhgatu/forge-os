import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyQuoteQuery } from '../queries/get-daily-quote.query';
import { QuoteRepository } from '../ports/quote.repository';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { Inject } from '@nestjs/common';

@QueryHandler(GetDailyQuoteQuery)
export class GetDailyQuoteHandler implements IQueryHandler<GetDailyQuoteQuery> {
  constructor(
    @Inject('QuoteRepository')
    private readonly repository: QuoteRepository,
  ) {}

  async execute(query: GetDailyQuoteQuery) {
    const today = new Date().toISOString().split('T')[0];
    const quote = await this.repository.findDaily(today);

    if (!quote) {
      return null;
    }

    return QuotePresenter.toResponse(quote, query.lang);
  }
}
