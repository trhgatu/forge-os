import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateJournalCommand } from '../commands/update-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler
  implements ICommandHandler<UpdateJournalCommand, JournalResponse>
{
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<JournalResponse> {
    const { id, payload } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    journal.updateInfo(payload);

    await this.journalRepo.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(id, 'update'));

    return JournalPresenter.toResponse(journal);
  }
}
