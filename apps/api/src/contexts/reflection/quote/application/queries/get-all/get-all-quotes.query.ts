import { IQuery } from '@nestjs/cqrs';
import { QuoteFilter } from '../quote-filter';

export class GetAllQuotesQuery implements IQuery {
  constructor(
    public readonly payload: QuoteFilter,
    public readonly lang: string = 'en',
  ) {}
}
