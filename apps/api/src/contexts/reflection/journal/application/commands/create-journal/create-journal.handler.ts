import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateJournalCommand } from './create-journal.command';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';
import { JournalId } from '../../../domain/value-objects/journal-id.vo';
import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalSource } from '../../../domain/enums';
import { CacheService } from '@shared/services';
import { JournalCreatedEvent } from '../../events/journal-created.event';

@CommandHandler(CreateJournalCommand)
export class CreateJournalHandler implements ICommandHandler<CreateJournalCommand, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateJournalCommand): Promise<Journal> {
    const { payload } = command;

    const journalId = JournalId.random();

    const journal = Journal.create(
      {
        title: payload.title,
        content: payload.content,
        mood: payload.mood ?? MoodType.NEUTRAL,
        tags: payload.tags ?? [],
        type: (payload.type as JournalType) ?? JournalType.THOUGHT,
        status: (payload.status as JournalStatus) ?? JournalStatus.PRIVATE,
        source: (payload.source as JournalSource) ?? JournalSource.USER,
        relations: (payload.relations ?? []) as any,
        userId: payload.userId!,
      },
      journalId,
    );

    await this.journalRepo.save(journal);

    await this.cacheService.deleteByPattern('journals:*');

    await this.eventBus.publish(new JournalCreatedEvent(journal.id));

    return journal;
  }
}
