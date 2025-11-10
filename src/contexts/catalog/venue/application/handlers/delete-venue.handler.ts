import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteVenueCommand } from '../commands/delete-venue.command';
import { VenueRepository } from '../../application/ports/venue.repository';
import { EventBus } from '@nestjs/cqrs';
import { VenueModifiedEvent } from '../events/venue-modified.event';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteVenueCommand)
export class DeleteVenueHandler implements ICommandHandler<DeleteVenueCommand> {
  constructor(
    @Inject('VenueRepository') private readonly venueRepo: VenueRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteVenueCommand): Promise<void> {
    const { id } = command;
    const venue = await this.venueRepo.findById(id);

    if (!venue) throw new NotFoundException('Venue not found');

    await this.venueRepo.delete(command.id);

    this.eventBus.publish(new VenueModifiedEvent(command.id, 'delete'));
  }
}
