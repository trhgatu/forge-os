import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from '../journal-modified.event';
import { Logger } from '@nestjs/common';

@EventsHandler(JournalModifiedEvent)
export class LogJournalActivityHandler implements IEventHandler<JournalModifiedEvent> {
  private readonly logger = new Logger(LogJournalActivityHandler.name);

  handle(event: JournalModifiedEvent) {
    this.logger.log(`[Audit] Journal activity handled for ID: ${event.id.value}`);
  }
}
