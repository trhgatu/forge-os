import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetQuoteByIdForPublicQuery } from '../queries/get-quote-by-id-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { QuoteResponse } from '../../presentation/dto/quote.response';
import { QuotePresenter } from '../../presentation/quote.presenter';

@QueryHandler(GetQuoteByIdForPublicQuery)
export class GetQuoteByIdForPublicHandler
  implements IQueryHandler<GetQuoteByIdForPublicQuery, QuoteResponse>
{
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
  ) {}

  async execute(query: GetQuoteByIdForPublicQuery): Promise<QuoteResponse> {
    const { id, lang } = query;
    const quote = await this.quoteRepo.findById(id);

    if (!quote || quote.isQuoteDeleted) {
      throw new NotFoundException('Quote not found');
    }

    return QuotePresenter.toResponse(quote, lang);
  }
}
