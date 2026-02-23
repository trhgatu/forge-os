import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { SoftDeleteJournalCommand } from '../commands/soft-delete-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@CommandHandler(SoftDeleteJournalCommand)
export class SoftDeleteJournalHandler implements ICommandHandler<
  SoftDeleteJournalCommand,
  JournalResponse
> {
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteJournalCommand): Promise<JournalResponse> {
    const { id } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    journal.delete();
    await this.journalRepo.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(id, 'soft-delete'));

    return JournalPresenter.toResponse(journal);
  }
}
