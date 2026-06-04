import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMoodCommand } from './update-mood.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { MoodRepository } from '../../../domain/mood.repository';
import { Mood } from '../../../domain/mood.entity';

@CommandHandler(UpdateMoodCommand)
export class UpdateMoodHandler implements ICommandHandler<UpdateMoodCommand, Mood> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: UpdateMoodCommand): Promise<Mood> {
    const mood = await this.moodRepo.findById(command.id);
    if (!mood) throw new NotFoundException('Mood not found');

    mood.update({
      mood: command.payload.mood ?? mood.toPrimitives().mood,
      note: command.payload.note ?? mood.toPrimitives().note,
      intensity:
        command.payload.intensity !== undefined
          ? command.payload.intensity
          : mood.toPrimitives().intensity,
      tags: command.payload.tags ?? mood.toPrimitives().tags,
      loggedAt: command.payload.loggedAt
        ? new Date(command.payload.loggedAt)
        : mood.toPrimitives().loggedAt,
      userId:
        command.payload.userId !== undefined ? command.payload.userId : mood.toPrimitives().userId,
    });

    await this.moodRepo.save(mood);
    return mood;
  }
}
