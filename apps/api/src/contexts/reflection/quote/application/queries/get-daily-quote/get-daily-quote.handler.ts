import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyQuoteQuery } from './get-daily-quote.query';
import { Inject } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { Quote } from '../../../domain/quote.entity';

@QueryHandler(GetDailyQuoteQuery)
export class GetDailyQuoteHandler implements IQueryHandler<GetDailyQuoteQuery, Quote | null> {
  constructor(
    @Inject('QuoteRepository')
    private readonly repository: QuoteRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_query: GetDailyQuoteQuery): Promise<Quote | null> {
    const today = new Date().toISOString().split('T')[0];
    const quote = await this.repository.findDaily(today);

    if (!quote) {
      return null;
    }

    return quote;
  }
}
