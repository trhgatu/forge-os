import { IQuery } from '@nestjs/cqrs';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';

export class GetQuoteByIdForPublicQuery implements IQuery {
  constructor(
    public readonly id: QuoteId,
    public readonly lang: string = 'en',
  ) {}
}
