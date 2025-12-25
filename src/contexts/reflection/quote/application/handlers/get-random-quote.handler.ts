import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRandomQuoteQuery } from '../queries/get-random-quote.query';
import { QuoteRepository } from '../ports/quote.repository';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { Inject } from '@nestjs/common';

@QueryHandler(GetRandomQuoteQuery)
export class GetRandomQuoteHandler
  implements IQueryHandler<GetRandomQuoteQuery>
{
  constructor(
    @Inject('QuoteRepository')
    private readonly repository: QuoteRepository,
  ) {}

  async execute(query: GetRandomQuoteQuery) {
    const quote = await this.repository.findRandom();
    if (!quote) {
      return null;
    }
    return QuotePresenter.toResponse(quote, query.lang);
  }
}
