import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMoodCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';
import { Mood } from '../../domain/mood.entity';
import { MoodId } from '../../domain/value-objects/mood-id.vo';
import { ObjectId } from 'mongodb';
import { MoodPresenter } from '../../presentation/mood.presenter';
import { MoodResponse } from '../../presentation/dto/mood.response';

@CommandHandler(CreateMoodCommand)
export class CreateMoodHandler
  implements ICommandHandler<CreateMoodCommand, MoodResponse>
{
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: CreateMoodCommand): Promise<MoodResponse> {
    const { payload } = command;
    const id = MoodId.create(new ObjectId());
    const mood = Mood.create(
      {
        mood: payload.mood,
        note: payload.note,
        tags: payload.tags ?? [],
        loggedAt: payload.loggedAt ? new Date(payload.loggedAt) : new Date(),
      },
      id,
    );

    await this.moodRepo.save(mood);
    return MoodPresenter.toResponse(mood);
  }
}
