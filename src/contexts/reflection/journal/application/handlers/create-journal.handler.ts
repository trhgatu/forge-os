import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateJournalCommand } from '../commands/create-journal.command';
import { JournalRepository } from '../ports/journal.repository';

import { Journal } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

import { ObjectId } from 'mongodb';
import { JournalModifiedEvent } from '../events/journal-modified.event';

import { MoodType } from '@shared/enums';
import { JournalStatus } from '../../domain/enums/journal-status.enum';
import { JournalType } from '../../domain/enums/journal-type.enum';
import { CacheService } from '@shared/services';
import { LoggerService } from '@shared/logging/logger.service';

@CommandHandler(CreateJournalCommand)
export class CreateJournalHandler
  implements ICommandHandler<CreateJournalCommand, JournalResponse>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: CreateJournalCommand): Promise<JournalResponse> {
    const { payload } = command;
    const now = new Date();

    const id = JournalId.create(new ObjectId());

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
      id,
      now,
    );

    await this.journalRepo.save(journal);

    // Invalidate all journal public cache
    await this.cacheService.deleteByPattern('journals:public:*');

    this.eventBus.publish(new JournalModifiedEvent(id, 'create'));
    this.logger.log(
      `Created Journal ${id.toString()} with title: ${journal.title}`,
      CreateJournalHandler.name,
    );

    return JournalPresenter.toResponse(journal);
  }
}
