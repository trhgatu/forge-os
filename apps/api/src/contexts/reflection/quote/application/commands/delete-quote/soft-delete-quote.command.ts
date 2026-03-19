import { Command } from '@nestjs/cqrs';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';

export class SoftDeleteQuoteCommand extends Command<QuoteResponse> {
  constructor(public readonly id: QuoteId) {
    super();
  }
}
