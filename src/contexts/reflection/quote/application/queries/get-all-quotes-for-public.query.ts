import { QuoteFilter } from './quote-filter';

export class GetAllQuotesForPublicQuery {
  constructor(
    public readonly payload: QuoteFilter,
    public readonly lang: string = 'en',
  ) {}
}
