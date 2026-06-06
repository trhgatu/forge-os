import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuotesQuery } from './get-all-quotes.query';
import { Inject } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Quote } from '../../../domain/quote.entity';
import { QuoteCacheKeys } from '../../../infrastructure/cache/quote-cache.keys';

@QueryHandler(GetAllQuotesQuery)
export class GetAllQuotesHandler implements IQueryHandler<
  GetAllQuotesQuery,
  PaginatedResult<Quote>
> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllQuotesQuery): Promise<PaginatedResult<Quote>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = QuoteCacheKeys.GET_ALL_ADMIN(page, limit, payload);

    const cached = await this.cacheService.get<PaginatedResult<Quote>>(cacheKey);
    if (cached) return cached;

    const quotes = await this.quoteRepo.findAll(payload);

    await this.cacheService.set(cacheKey, quotes, 60);
    return quotes;
  }
}
