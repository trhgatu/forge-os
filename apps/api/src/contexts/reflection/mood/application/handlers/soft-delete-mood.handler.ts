import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SoftDeleteMoodCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';

@CommandHandler(SoftDeleteMoodCommand)
export class SoftDeleteMoodHandler implements ICommandHandler<SoftDeleteMoodCommand, void> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: SoftDeleteMoodCommand): Promise<void> {
    await this.moodRepo.softDelete(command.id);
  }
}
