import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalCreatedEvent } from './journal-created.event';
import { Inject, Logger } from '@nestjs/common';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';

@EventsHandler(JournalCreatedEvent)
export class JournalCreatedHandler implements IEventHandler<JournalCreatedEvent> {
  private readonly logger = new Logger(JournalCreatedHandler.name);

  constructor(
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
  ) {}

  async handle(event: JournalCreatedEvent) {
    this.logger.log(`Journal created event handled: ${event.id.value}`);
    try {
      await this.activityStream.emit('reflection.journal.created', event.userId, {
        journalId: event.id.value,
        title: event.title,
      });
      this.logger.log(
        `Emitted reflection.journal.created event to activity stream for journal ${event.id.value}`,
      );
    } catch (error) {
      this.logger.error(`Failed to emit reflection.journal.created event: ${error}`);
    }
  }
}
