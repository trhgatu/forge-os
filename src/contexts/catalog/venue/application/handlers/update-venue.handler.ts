import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateVenueCommand } from '../commands/update-venue.command';
import { VenueRepository } from '../../application/ports/venue.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { VenueModifiedEvent } from '../events/venue-modified.event';
import { VenuePresenter } from '../../presentation/venue.presenter';
import { VenueResponse } from '../../presentation/dto/venue.response';

@CommandHandler(UpdateVenueCommand)
export class UpdateVenueHandler
  implements ICommandHandler<UpdateVenueCommand, VenueResponse>
{
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateVenueCommand): Promise<VenueResponse> {
    const { id, payload } = command;

    const venue = await this.venueRepo.findById(id);
    if (!venue) throw new NotFoundException('Venue not found');

    venue.updateInfo(payload);

    await this.venueRepo.save(venue);

    this.eventBus.publish(new VenueModifiedEvent(id, 'update'));

    return VenuePresenter.toResponse(venue);
  }
}
