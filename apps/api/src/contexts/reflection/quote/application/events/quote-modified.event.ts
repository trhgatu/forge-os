import { QuoteId } from '../../domain/value-objects/quote-id.vo';

export class QuoteModifiedEvent {
  constructor(
    public readonly quoteId: QuoteId,
    public readonly action: 'create' | 'update' | 'delete' | 'restore' | 'soft-delete',
  ) {}
}
