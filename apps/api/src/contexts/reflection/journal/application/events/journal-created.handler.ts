import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalCreatedEvent } from './journal-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(JournalCreatedEvent)
export class JournalCreatedHandler implements IEventHandler<JournalCreatedEvent> {
  private readonly logger = new Logger(JournalCreatedHandler.name);

  handle(event: JournalCreatedEvent) {
    this.logger.log(`Journal created event handled: ${event.id.value}`);
  }
}
