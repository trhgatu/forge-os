import { IQuery } from '@nestjs/cqrs';
import { QuoteFilter } from '../quote-filter';

export class GetAllQuotesForPublicQuery implements IQuery {
  constructor(
    public readonly payload: QuoteFilter,
    public readonly lang: string = 'en',
  ) {}
}
