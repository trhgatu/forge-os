import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyQuoteQuery } from './get-daily-quote.query';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';
import { CacheService } from '@shared/services';
import { QuoteCacheKeys } from '../../../infrastructure/cache/quote-cache.keys';

@QueryHandler(GetDailyQuoteQuery)
export class GetDailyQuoteHandler implements IQueryHandler<
  GetDailyQuoteQuery,
  QuoteResponse | null
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetDailyQuoteQuery): Promise<QuoteResponse | null> {
    const { lang } = query;

    const today = new Date().toLocaleDateString('en-CA');

    const cacheKey = QuoteCacheKeys.GET_DAILY(today, lang);
    const cached = await this.cacheService.get<QuoteResponse>(cacheKey);
    if (cached) return cached;

    const quote = await this.quoteRepo.findDaily(today);

    if (!quote) {
      return null;
    }

    const response = QuoteResponse.fromEntity(quote, lang);

    await this.cacheService.set(cacheKey, response, 3600);

    return response;
  }
}
