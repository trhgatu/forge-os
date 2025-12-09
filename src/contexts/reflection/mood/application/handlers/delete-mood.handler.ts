import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMoodCommand } from '../commands';
import { Inject } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';

@CommandHandler(DeleteMoodCommand)
export class DeleteMoodHandler
  implements ICommandHandler<DeleteMoodCommand, void>
{
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(command: DeleteMoodCommand): Promise<void> {
    await this.moodRepo.delete(command.id);
  }
}
