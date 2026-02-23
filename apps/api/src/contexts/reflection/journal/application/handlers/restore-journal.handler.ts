import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { RestoreJournalCommand } from '../commands/restore-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@CommandHandler(RestoreJournalCommand)
export class RestoreJournalHandler implements ICommandHandler<
  RestoreJournalCommand,
  JournalResponse
> {
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreJournalCommand): Promise<JournalResponse> {
    const { id } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    journal.restore();
    await this.journalRepo.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(id, 'restore'));

    return JournalPresenter.toResponse(journal);
  }
}
