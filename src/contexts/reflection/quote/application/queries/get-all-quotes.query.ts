import { QuoteFilter } from './quote-filter';

export class GetAllQuotesQuery {
  constructor(
    public readonly payload: QuoteFilter,
    public readonly lang: string = 'en',
  ) {}
}
