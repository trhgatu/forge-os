import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { DeleteJournalCommand } from '../commands/delete-journal.command';
import { JournalRepository } from '../ports/journal.repository';
import { JournalModifiedEvent } from '../events/journal-modified.event';

@CommandHandler(DeleteJournalCommand)
export class DeleteJournalHandler implements ICommandHandler<DeleteJournalCommand> {
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteJournalCommand): Promise<void> {
    const { id } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    await this.journalRepo.delete(id);
    this.eventBus.publish(new JournalModifiedEvent(id, 'delete'));
  }
}
