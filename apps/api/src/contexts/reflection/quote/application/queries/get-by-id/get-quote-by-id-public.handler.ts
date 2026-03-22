import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetQuoteByIdForPublicQuery } from './get-quote-by-id-public.query';
import { NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';
import { CacheService } from '@shared/services';
import { QuoteCacheKeys } from '../../../infrastructure/cache/quote-cache.keys';

@QueryHandler(GetQuoteByIdForPublicQuery)
export class GetQuoteByIdForPublicHandler implements IQueryHandler<
  GetQuoteByIdForPublicQuery,
  QuoteResponse
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetQuoteByIdForPublicQuery): Promise<QuoteResponse> {
    const { id, lang } = query;

    const cacheKey = QuoteCacheKeys.GET_BY_ID(id);
    const cached = await this.cacheService.get<QuoteResponse>(cacheKey);
    if (cached) return cached;

    const quote = await this.quoteRepo.findById(id);

    if (!quote || quote.isDeleted) {
      throw new NotFoundException(`Quote with ID ${id.value} not found or has been deleted`);
    }

    const response = QuoteResponse.fromEntity(quote, lang);

    await this.cacheService.set(cacheKey, response, 600);

    return response;
  }
}
