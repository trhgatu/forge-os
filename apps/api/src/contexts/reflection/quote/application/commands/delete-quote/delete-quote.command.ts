import { Command } from '@nestjs/cqrs';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';

export class DeleteQuoteCommand extends Command<void> {
  constructor(public readonly id: QuoteId) {
    super();
  }
}
