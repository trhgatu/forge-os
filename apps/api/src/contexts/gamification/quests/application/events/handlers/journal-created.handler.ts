import { EventsHandler, IEventHandler, CommandBus } from '@nestjs/cqrs';
import { JournalCreatedEvent } from '../../../../../reflection/journal/application/events/journal-created.event';
import { JournalRepository } from '../../../../../reflection/journal/domain/journal.repository';
import { IncrementObjectiveProgressCommand } from '../../commands/increment-objective-progress.command';

@EventsHandler(JournalCreatedEvent)
export class JournalCreatedQuestHandler implements IEventHandler<JournalCreatedEvent> {
  constructor(
    private readonly journalRepository: JournalRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: JournalCreatedEvent): Promise<void> {
    const journal = await this.journalRepository.findById(event.id);
    if (!journal) return;

    await this.commandBus.execute(
      new IncrementObjectiveProgressCommand(journal.userId, 'CREATE_JOURNAL', 1, journal.id.value),
    );
  }
}
