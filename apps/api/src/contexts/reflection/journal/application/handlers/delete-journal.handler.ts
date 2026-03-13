import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';

import { LoggerService } from '@shared/logging/logger.service';

import { DeleteJournalCommand } from '../commands/delete-journal.command';
import { JournalRepository } from '../ports/journal.repository';

import { JournalModifiedEvent } from '../events/journal-modified.event';

@CommandHandler(DeleteJournalCommand)
export class DeleteJournalHandler implements ICommandHandler<DeleteJournalCommand, void> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteJournalCommand): Promise<void> {
    const { id } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id.toString()} not found`);
    }

    journal.delete();
    await this.journalRepo.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(id, 'delete'));

    this.logger.warn(
      `Journal soft-deleted: ${id.toString()} (Title: "${journal.title || 'Untitled'}")`,
      'DeleteJournalHandler',
    );

    return;
  }
}
