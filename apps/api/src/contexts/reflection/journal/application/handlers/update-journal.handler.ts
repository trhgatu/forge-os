import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateJournalCommand } from '../commands/update-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';
import { Journal } from '../../domain/journal.entity';
import { CacheService } from '@shared/services';
import { LoggerService } from '@shared/logging';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler implements ICommandHandler<UpdateJournalCommand> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<Journal> {
    const { id, payload } = command;

    const journal = await this.journalRepository.findById(id);

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    journal.updateInfo(payload);

    await this.journalRepository.save(journal);

    this.logger.warn(`Journal ${id} updated. Title length: ${journal.title?.length}`);

    await this.cacheService.deleteByPattern('journals:*');

    return journal;
  }
}
