import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCourtCommand } from '../commands/delete-court.command';
import { CourtRepository } from '../../application/ports/court.repository';
import { EventBus } from '@nestjs/cqrs';
import { CourtModifiedEvent } from '../events/court-modified.event';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteCourtCommand)
export class DeleteCourtHandler implements ICommandHandler<DeleteCourtCommand> {
  constructor(
    @Inject('CourtRepository') private readonly courtRepo: CourtRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCourtCommand): Promise<void> {
    const { id } = command;
    const court = await this.courtRepo.findById(id);

    if (!court) throw new NotFoundException('Court not found');

    await this.courtRepo.delete(command.id);

    this.eventBus.publish(new CourtModifiedEvent(command.id, 'delete'));
  }
}
