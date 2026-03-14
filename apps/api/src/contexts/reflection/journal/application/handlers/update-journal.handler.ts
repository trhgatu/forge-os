import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateJournalCommand } from '../commands/update-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';
import { Journal } from '../../domain/journal.entity';

import { LoggerService } from '@shared/logging';

import { JournalModifiedEvent } from '../events/journal-modified.event';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler implements ICommandHandler<UpdateJournalCommand> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<Journal> {
    const { id, payload } = command;

    const journal = await this.journalRepository.findById(id);

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    journal.updateInfo(payload);

    await this.journalRepository.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(id, 'update'));

    this.logger.warn(`Journal ${id} updated. Title length: ${journal.title?.length}`);

    return journal;
  }
}
