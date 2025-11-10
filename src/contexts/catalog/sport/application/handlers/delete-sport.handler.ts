import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteSportCommand } from '../commands/delete-sport.command';
import { SportRepository } from '../ports/sport.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { SportModifiedEvent } from '../events/sport-modified.event';

@CommandHandler(DeleteSportCommand)
export class DeleteSportHandler implements ICommandHandler<DeleteSportCommand> {
  constructor(
    @Inject('SportRepository') private readonly sportRepo: SportRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteSportCommand): Promise<void> {
    const { id } = command;

    const sport = await this.sportRepo.findById(id);
    if (!sport) throw new NotFoundException('Sport not found');

    await this.sportRepo.delete(id);
    this.eventBus.publish(new SportModifiedEvent(id, 'delete'));
  }
}
