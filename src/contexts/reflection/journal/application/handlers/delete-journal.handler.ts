import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJournalCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';

@CommandHandler(DeleteJournalCommand)
export class DeleteJournalHandler
  implements ICommandHandler<DeleteJournalCommand, void>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(command: DeleteJournalCommand): Promise<void> {
    await this.journalRepo.delete(command.id);
  }
}
