import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJournalCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';
import { Journal } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { ObjectId } from 'mongodb';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@CommandHandler(CreateJournalCommand)
export class CreateJournalHandler
  implements ICommandHandler<CreateJournalCommand, JournalResponse>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(command: CreateJournalCommand): Promise<JournalResponse> {
    const { payload } = command;
    const id = JournalId.create(new ObjectId());
    const journal = Journal.create(
      {
        title: payload.title,
        content: payload.content,
        mood: payload.mood,
        tags: payload.tags ?? [],
        date: payload.date ? new Date(payload.date) : new Date(),
      },
      id,
    );

    await this.journalRepo.save(journal);
    return JournalPresenter.toResponse(journal);
  }
}
