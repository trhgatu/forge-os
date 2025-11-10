import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreVenueCommand } from '../commands/restore-venue.command';
import { VenueRepository } from '../../application/ports/venue.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { VenueModifiedEvent } from '../events/venue-modified.event';
import { VenuePresenter } from '../../presentation/venue.presenter';
import { VenueResponse } from '../../presentation/dto/venue.response';

@CommandHandler(RestoreVenueCommand)
export class RestoreVenueHandler
  implements ICommandHandler<RestoreVenueCommand, VenueResponse>
{
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreVenueCommand): Promise<VenueResponse> {
    const { id } = command;

    const venue = await this.venueRepo.findById(id);
    if (!venue) throw new NotFoundException('Venue not found');

    venue.restore();

    await this.venueRepo.save(venue);

    this.eventBus.publish(new VenueModifiedEvent(id, 'restore'));

    return VenuePresenter.toResponse(venue);
  }
}
