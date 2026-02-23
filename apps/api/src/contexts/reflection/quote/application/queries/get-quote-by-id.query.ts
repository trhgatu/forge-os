import { QuoteId } from '../../domain/value-objects/quote-id.vo';

export class GetQuoteByIdQuery {
  constructor(
    public readonly id: QuoteId,
    public readonly lang: string = 'en',
  ) {}
}
