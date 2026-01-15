import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { LoggerService } from '@shared/logging/logger.service';

@EventsHandler(JournalModifiedEvent)
export class LogJournalActivityHandler
  implements IEventHandler<JournalModifiedEvent>
{
  constructor(private readonly logger: LoggerService) {}

  handle(event: JournalModifiedEvent) {
    const { journalId, action } = event;
    this.logger.log(
      `[Audit] Journal ${action} success (ID: ${journalId.toString()})`,
      LogJournalActivityHandler.name,
    );
  }
}
