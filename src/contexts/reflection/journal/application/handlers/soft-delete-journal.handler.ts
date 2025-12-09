import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SoftDeleteJournalCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';

@CommandHandler(SoftDeleteJournalCommand)
export class SoftDeleteJournalHandler
  implements ICommandHandler<SoftDeleteJournalCommand, void>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(command: SoftDeleteJournalCommand): Promise<void> {
    await this.journalRepo.softDelete(command.id);
  }
}
