import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RestoreJournalCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';

@CommandHandler(RestoreJournalCommand)
export class RestoreJournalHandler
  implements ICommandHandler<RestoreJournalCommand, void>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(command: RestoreJournalCommand): Promise<void> {
    await this.journalRepo.restore(command.id);
  }
}
