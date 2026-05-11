import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, Inject } from '@nestjs/common';
import { UpdateJournalCommand } from './update-journal.command';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';
import { JournalStatus } from '../../../domain/enums';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler implements ICommandHandler<UpdateJournalCommand, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<Journal> {
    const { id, payload } = command;

    const journal = await this.journalRepo.findById(id, payload.userId);

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    if (payload.content !== undefined || payload.title !== undefined) {
      journal.updateContent(payload.content ?? journal.content, payload.title);
    }

    if (payload.mood) {
      journal.changeMood(payload.mood);
    }

    if (payload.status) {
      if (payload.status === JournalStatus.PUBLISHED) journal.publish();
      if (payload.status === JournalStatus.ARCHIVED) journal.archive();
    }

    if (payload.tags) {
      journal.addTags(payload.tags);
    }

    await this.journalRepo.save(journal);

    return journal;
  }
}
