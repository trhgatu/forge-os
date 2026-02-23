import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateJournalCommand } from '../commands/create-journal.command';
import { JournalRepository } from '../ports/journal.repository';
import { Journal } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';
import { JournalModifiedEvent } from '../events/journal-modified.event';
import { MoodType } from '@shared/enums';
import { JournalStatus } from '../../domain/enums/journal-status.enum';
import { JournalType } from '../../domain/enums/journal-type.enum';

@CommandHandler(CreateJournalCommand)
export class CreateJournalHandler
  implements ICommandHandler<CreateJournalCommand, JournalResponse>
{
  constructor(
    private readonly journalRepo: JournalRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateJournalCommand): Promise<JournalResponse> {
    const { payload } = command;
    const now = new Date();

    const journalId = JournalId.random();

    const journal = Journal.create(
      {
        title: payload.title,
        content: payload.content,

        mood: payload.mood ?? MoodType.NEUTRAL,
        tags: payload.tags ?? [],

        type: payload.type ?? JournalType.THOUGHT,
        status: payload.status ?? JournalStatus.PRIVATE,

        source: payload.source ?? 'user',

        relations: payload.relations ?? [],
      },
      journalId,
      now,
    );

    await this.journalRepo.save(journal);

    this.eventBus.publish(new JournalModifiedEvent(journalId, 'create'));

    return JournalPresenter.toResponse(journal);
  }
}
