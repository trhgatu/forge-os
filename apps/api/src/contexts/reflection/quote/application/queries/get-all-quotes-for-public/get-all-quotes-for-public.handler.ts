import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuotesForPublicQuery } from './get-all-quotes-for-public.query';
import { Inject } from '@nestjs/common';
import { QuoteRepository } from '../../../domain/quote.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Quote } from '../../../domain/quote.entity';
import { QuoteCacheKeys } from '../../../infrastructure/cache/quote-cache.keys';
import { QuoteMapper } from '../../../infrastructure/repositories/quote.mapper';

@QueryHandler(GetAllQuotesForPublicQuery)
export class GetAllQuotesForPublicHandler implements IQueryHandler<
  GetAllQuotesForPublicQuery,
  PaginatedResult<Quote>
> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllQuotesForPublicQuery): Promise<PaginatedResult<Quote>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = QuoteCacheKeys.GET_ALL_PUBLIC(page, limit, payload);

    const cached = await this.cacheService.get<PaginatedResult<any>>(cacheKey);
    if (cached) {
      return {
        meta: cached.meta,
        data: cached.data
          .map((doc) => QuoteMapper.toDomain(doc))
          .filter((q): q is Quote => q !== null),
      };
    }

    const quotes = await this.quoteRepo.findAll({
      ...payload,
      isDeleted: false,
    });

    const cacheData = {
      meta: quotes.meta,
      data: quotes.data.map((q) => QuoteMapper.toPersistence(q)),
    };

    await this.cacheService.set(cacheKey, cacheData, 60);
    return quotes;
  }
}
