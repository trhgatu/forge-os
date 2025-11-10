import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteVenueCommand } from '../commands/soft-delete-venue.command';
import { VenueRepository } from '../../application/ports/venue.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { VenueModifiedEvent } from '../events/venue-modified.event';
import { VenuePresenter } from '../../presentation/venue.presenter';
import { VenueResponse } from '../../presentation/dto/venue.response';

@CommandHandler(SoftDeleteVenueCommand)
export class SoftDeleteVenueHandler
  implements ICommandHandler<SoftDeleteVenueCommand, VenueResponse>
{
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteVenueCommand): Promise<VenueResponse> {
    const { id } = command;

    const venue = await this.venueRepo.findById(id);
    if (!venue) throw new NotFoundException('Venue not found');

    venue.delete();

    await this.venueRepo.save(venue);

    this.eventBus.publish(new VenueModifiedEvent(id, 'soft-delete'));

    return VenuePresenter.toResponse(venue); // ✅ Trả lại DTO sạch
  }
}
