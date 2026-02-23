import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QuoteModifiedEvent } from '../events/quote-modified.event';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(QuoteModifiedEvent)
export class LogQuoteActivityHandler implements IEventHandler<QuoteModifiedEvent> {
  constructor(private readonly logger: LoggerService) {}

  handle(event: QuoteModifiedEvent) {
    const { quoteId, action } = event;
    this.logger.log(
      `[Audit] Quote ${action} success (ID: ${quoteId.toString()})`,
      LogQuoteActivityHandler.name,
    );
  }
}
