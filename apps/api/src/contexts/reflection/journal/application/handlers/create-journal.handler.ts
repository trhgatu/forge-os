import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';

import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';
import { LoggerService } from '@shared/logging/logger.service';
import { CacheService } from '@shared/services';
import { MoodType } from '@shared/enums';

import { JournalStatus } from '../../domain/enums/journal-status.enum';
import { JournalType } from '../../domain/enums/journal-type.enum';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { Journal } from '../../domain/journal.entity';

import { CreateJournalCommand } from '../commands/create-journal.command';
import { JournalRepository } from '../ports/journal.repository';

@CommandHandler(CreateJournalCommand)
export class CreateJournalHandler implements ICommandHandler<CreateJournalCommand, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepository: JournalRepository,
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: CreateJournalCommand): Promise<Journal> {
    const { payload } = command;
    const journalId = JournalId.create(new Types.ObjectId());
    const userId = payload.userId || 'system';

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
    );

    await this.journalRepository.save(journal);

    await this.cacheService.deleteByPattern('journals:*');

    await this.activityStream.emit('reflection.journal.created', userId, {
      journalId: journalId.toString(),
      title: journal.title,
      createdAt: new Date(),
    });

    this.logger.log(
      `Journal created: "${journal.title}" (ID: ${journalId.toString()})`,
      'CreateJournalHandler',
    );

    return journal;
  }
}
