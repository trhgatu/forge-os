import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuotesQuery } from '../queries/get-all-quotes.query';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { CacheService } from '@shared/services';
import { QuotePresenter } from '../../presentation/quote.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { QuoteResponse } from '../../presentation/dto/quote.response';
import { QuoteCacheKeys } from '../../infrastructure/cache/quote-cache.keys';

@QueryHandler(GetAllQuotesQuery)
export class GetAllQuotesHandler implements IQueryHandler<GetAllQuotesQuery> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllQuotesQuery,
  ): Promise<PaginatedResponse<QuoteResponse>> {
    const { payload } = query;
    const lang = payload.lang ?? 'en';
    const { page = 1, limit = 10 } = payload;

    const cacheKey = QuoteCacheKeys.GET_ALL_ADMIN(page, limit, payload);

    const cached =
      await this.cacheService.get<PaginatedResponse<QuoteResponse>>(cacheKey);
    if (cached) return cached;

    const quotes = await this.quoteRepo.findAll(payload);

    const response = {
      meta: quotes.meta,
      data: quotes.data.map((quote) => QuotePresenter.toResponse(quote, lang)),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
