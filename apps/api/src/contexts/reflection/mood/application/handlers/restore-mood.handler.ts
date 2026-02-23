import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RestoreMoodCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';

@CommandHandler(RestoreMoodCommand)
export class RestoreMoodHandler implements ICommandHandler<RestoreMoodCommand, void> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: RestoreMoodCommand): Promise<void> {
    await this.moodRepo.restore(command.id);
  }
}
