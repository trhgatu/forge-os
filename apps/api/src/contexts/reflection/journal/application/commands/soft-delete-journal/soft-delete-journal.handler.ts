import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, Inject } from '@nestjs/common';
import { SoftDeleteJournalCommand } from './soft-delete-journal.command';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';
import { JournalId } from '../../../domain/value-objects/journal-id.vo';

@CommandHandler(SoftDeleteJournalCommand)
export class SoftDeleteJournalHandler implements ICommandHandler<SoftDeleteJournalCommand, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) { }

  async execute(command: SoftDeleteJournalCommand): Promise<Journal> {
    const { id } = command;

    const journal = await this.journalRepo.findById(id);

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    journal.delete();

    await this.journalRepo.save(journal);

    return journal;
  }
}
