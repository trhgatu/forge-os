import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuotesForPublicQuery } from '../get-all/get-all-quotes-for-public.query';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { CacheService } from '@shared/services';
import { QuoteCacheKeys } from '../../../infrastructure/cache/quote-cache.keys';

@QueryHandler(GetAllQuotesForPublicQuery)
export class GetAllQuotesForPublicHandler implements IQueryHandler<
  GetAllQuotesForPublicQuery,
  PaginatedResponse<QuoteResponse>
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllQuotesForPublicQuery): Promise<PaginatedResponse<QuoteResponse>> {
    const { payload, lang } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = QuoteCacheKeys.GET_ALL_PUBLIC(page, limit, payload);

    const cached = await this.cacheService.get<PaginatedResponse<QuoteResponse>>(cacheKey);
    if (cached) return cached;

    const result = await this.quoteRepo.findAll({
      ...payload,
      isDeleted: false,
    });

    const response: PaginatedResponse<QuoteResponse> = {
      data: QuoteResponse.fromEntities(result.data, lang),
      meta: {
        total: result.meta.total,
        page: result.meta.page,
        limit: result.meta.limit,
        totalPages: result.meta.totalPages,
      },
    };

    await this.cacheService.set(cacheKey, response, 300);

    return response;
  }
}
