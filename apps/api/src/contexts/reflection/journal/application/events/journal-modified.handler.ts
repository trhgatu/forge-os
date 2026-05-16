import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from './journal-modified.event';
import { Logger } from '@nestjs/common';

@EventsHandler(JournalModifiedEvent)
export class JournalModifiedHandler implements IEventHandler<JournalModifiedEvent> {
  private readonly logger = new Logger(JournalModifiedHandler.name);

  handle(event: JournalModifiedEvent) {
    this.logger.log(`Journal modified event handled: ${event.id.value}`);
  }
}
