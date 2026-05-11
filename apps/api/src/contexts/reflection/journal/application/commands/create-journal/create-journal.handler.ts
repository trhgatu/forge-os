import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateJournalCommand } from './create-journal.command';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';
import { JournalId } from '../../../domain/value-objects/journal-id.vo';
import { JournalModifiedEvent } from '../../events/journal-modified.event';
import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalSource } from '../../../domain/enums';

@CommandHandler(CreateJournalCommand)
export class CreateJournalHandler implements ICommandHandler<CreateJournalCommand, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) { }

  async execute(command: CreateJournalCommand): Promise<Journal> {
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
        source: payload.source ?? JournalSource.USER,
        relations: payload.relations ?? [],
      },
      journalId,
      now,
    );

    await this.journalRepo.save(journal);

    return journal;
  }
}
