import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJournalCommand } from '../commands';
import { Inject, NotFoundException } from '@nestjs/common';
import { JournalRepository } from '../ports/journal.repository';
import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler
  implements ICommandHandler<UpdateJournalCommand, JournalResponse>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<JournalResponse> {
    const journal = await this.journalRepo.findById(command.id);
    if (!journal) throw new NotFoundException('Journal not found');

    journal.update({
      title: command.payload.title ?? journal.toPrimitives().title,
      content: command.payload.content ?? journal.toPrimitives().content,
      tags: command.payload.tags ?? journal.toPrimitives().tags,
      mood: command.payload.mood ?? journal.toPrimitives().mood,
      date: command.payload.date
        ? new Date(command.payload.date)
        : journal.toPrimitives().date,
    });

    await this.journalRepo.save(journal);
    return JournalPresenter.toResponse(journal);
  }
}
