import { Inject } from '@nestjs/common';
import { LoggerService } from '@shared/logging';

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { Journal } from '../../domain/journal.entity';
import { RestoreJournalCommand } from '../commands/restore-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';

import { JournalModifiedEvent } from '../events/journal-modified.event';

@CommandHandler(RestoreJournalCommand)
export class RestoreJournalHandler implements ICommandHandler<RestoreJournalCommand> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreJournalCommand): Promise<Journal> {
    const { id } = command;

    const journal = await this.journalRepository.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    journal.restore();

    await this.logger.warn(`Journal ${id} restored. Title length: ${journal.title?.length}`);

    await this.journalRepository.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(id, 'restore'));

    return journal;
  }
}
