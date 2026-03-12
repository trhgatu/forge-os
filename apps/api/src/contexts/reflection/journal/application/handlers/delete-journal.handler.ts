import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';

import { LoggerService } from '@shared/logging/logger.service';
import { CacheService } from '@shared/services';

import { DeleteJournalCommand } from '../commands/delete-journal.command';
import { JournalRepository } from '../ports/journal.repository';

@CommandHandler(DeleteJournalCommand)
export class DeleteJournalHandler implements ICommandHandler<DeleteJournalCommand, void> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: DeleteJournalCommand): Promise<void> {
    const { id } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id.toString()} not found`);
    }

    journal.delete();
    await this.journalRepo.save(journal);

    await this.cacheService.deleteByPattern('journals:*');

    this.logger.warn(
      `Journal soft-deleted: ${id.toString()} (Title: "${journal.title || 'Untitled'}")`,
      'DeleteJournalHandler',
    );

    return;
  }
}
