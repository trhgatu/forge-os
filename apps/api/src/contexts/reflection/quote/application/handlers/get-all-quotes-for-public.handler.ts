import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllQuotesForPublicQuery } from '../queries/get-all-quotes-for-public.query';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { CacheService } from '@shared/services';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { QuoteResponse } from '../../presentation/dto/quote.response';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { PaginatedResult } from '@shared/types/paginated-result';
import { QuoteCacheKeys } from '../../infrastructure/cache/quote-cache.keys';

@QueryHandler(GetAllQuotesForPublicQuery)
export class GetAllQuotesForPublicHandler implements IQueryHandler<GetAllQuotesForPublicQuery> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllQuotesForPublicQuery,
  ): Promise<PaginatedResponse<QuoteResponse>> {
    const { payload, lang } = query;

    const { page = 1, limit = 10 } = payload;

    const cacheKey = QuoteCacheKeys.GET_ALL_PUBLIC(page, limit, payload);

    const cached =
      await this.cacheService.get<PaginatedResult<QuoteResponse>>(cacheKey);
    if (cached) return cached;

    const quotes = await this.quoteRepo.findAll({
      ...payload,
      isDeleted: false,
    });

    const response = {
      meta: quotes.meta,
      data: quotes.data.map((quote) => QuotePresenter.toResponse(quote, lang)),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
