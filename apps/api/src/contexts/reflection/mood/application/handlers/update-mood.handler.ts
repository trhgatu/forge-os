import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMoodCommand } from '../commands';
import { Inject, NotFoundException } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';
import { MoodPresenter } from '../../presentation/mood.presenter';
import { MoodResponse } from '../../presentation/dto/mood.response';

@CommandHandler(UpdateMoodCommand)
export class UpdateMoodHandler implements ICommandHandler<UpdateMoodCommand, MoodResponse> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: UpdateMoodCommand): Promise<MoodResponse> {
    const mood = await this.moodRepo.findById(command.id);
    if (!mood) throw new NotFoundException('Mood not found');

    mood.update({
      mood: command.payload.mood ?? mood.toPrimitives().mood,
      note: command.payload.note ?? mood.toPrimitives().note,
      tags: command.payload.tags ?? mood.toPrimitives().tags,
      loggedAt: command.payload.loggedAt
        ? new Date(command.payload.loggedAt)
        : mood.toPrimitives().loggedAt,
    });

    await this.moodRepo.save(mood);
    return MoodPresenter.toResponse(mood);
  }
}
