import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRandomQuoteQuery } from './get-random-quote.query';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';
import { CacheService } from '@shared/services';

@QueryHandler(GetRandomQuoteQuery)
export class GetRandomQuoteHandler implements IQueryHandler<
  GetRandomQuoteQuery,
  QuoteResponse | null
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetRandomQuoteQuery): Promise<QuoteResponse | null> {
    const { lang } = query;

    // 1. Check Cache (Optional: Nếu muốn cực nhanh, cache khoảng 5s)
    const cacheKey = `quotes:random:${lang}`;
    const cached = await this.cacheService.get<QuoteResponse>(cacheKey);
    if (cached) return cached;

    const quote = await this.quoteRepo.findRandom();

    if (!quote) return null;

    const response = QuoteResponse.fromEntity(quote, lang);

    await this.cacheService.set(cacheKey, response, 5);

    return response;
  }
}
