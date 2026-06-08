import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetQuoteByIdQuery } from './get-quote-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { Quote } from '../../../domain/quote.entity';

@QueryHandler(GetQuoteByIdQuery)
export class GetQuoteByIdHandler implements IQueryHandler<GetQuoteByIdQuery, Quote> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
  ) {}

  async execute(query: GetQuoteByIdQuery): Promise<Quote> {
    const { id } = query;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    return quote;
  }
}
