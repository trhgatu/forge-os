import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMoodCommand } from './create-mood.command';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../../../domain/mood.repository';
import { Mood } from '../../../domain/mood.entity';
import { MoodId } from '../../../domain/value-objects/mood-id.vo';

@CommandHandler(CreateMoodCommand)
export class CreateMoodHandler implements ICommandHandler<CreateMoodCommand, Mood> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: CreateMoodCommand): Promise<Mood> {
    const { payload } = command;
    const id = MoodId.create();
    const mood = Mood.create(
      {
        mood: payload.mood,
        note: payload.note,
        intensity: payload.intensity,
        tags: payload.tags ?? [],
        loggedAt: payload.loggedAt ? new Date(payload.loggedAt) : new Date(),
        userId: payload.userId,
      },
      id,
    );

    await this.moodRepo.save(mood);
    return mood;
  }
}
