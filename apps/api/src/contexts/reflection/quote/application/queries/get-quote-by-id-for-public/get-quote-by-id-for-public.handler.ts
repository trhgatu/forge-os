import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetQuoteByIdForPublicQuery } from './get-quote-by-id-for-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { Quote } from '../../../domain/quote.entity';

@QueryHandler(GetQuoteByIdForPublicQuery)
export class GetQuoteByIdForPublicHandler implements IQueryHandler<
  GetQuoteByIdForPublicQuery,
  Quote
> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
  ) {}

  async execute(query: GetQuoteByIdForPublicQuery): Promise<Quote> {
    const { id } = query;
    const quote = await this.quoteRepo.findById(id);

    if (!quote || quote.isQuoteDeleted) {
      throw new NotFoundException('Quote not found');
    }

    return quote;
  }
}
