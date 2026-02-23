import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetQuoteByIdQuery } from '../queries/get-quote-by-id.query';
import { NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { QuoteResponse } from '../../presentation/dto/quote.response';
import { QuotePresenter } from '../../presentation/quote.presenter';

@QueryHandler(GetQuoteByIdQuery)
export class GetQuoteByIdHandler implements IQueryHandler<
  GetQuoteByIdQuery,
  QuoteResponse
> {
  constructor(private readonly quoteRepo: QuoteRepository) {}

  async execute(query: GetQuoteByIdQuery): Promise<QuoteResponse> {
    const { id, lang } = query;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    return QuotePresenter.toResponse(quote, lang);
  }
}
