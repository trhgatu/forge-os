import { QuoteId } from '../../domain/value-objects/quote-id.vo';

export class DeleteQuoteCommand {
  constructor(public readonly id: QuoteId) {}
}
