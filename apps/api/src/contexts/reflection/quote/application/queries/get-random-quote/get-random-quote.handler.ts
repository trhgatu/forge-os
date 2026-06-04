import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRandomQuoteQuery } from './get-random-quote.query';
import { Inject } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { Quote } from '../../../domain/quote.entity';

@QueryHandler(GetRandomQuoteQuery)
export class GetRandomQuoteHandler implements IQueryHandler<GetRandomQuoteQuery, Quote | null> {
  constructor(
    @Inject('QuoteRepository')
    private readonly repository: QuoteRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_query: GetRandomQuoteQuery): Promise<Quote | null> {
    const quote = await this.repository.findRandom();
    if (!quote) {
      return null;
    }
    return quote;
  }
}
