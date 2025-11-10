import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVenueCommand } from '../commands/create-venue.command';
import { VenueRepository } from '../../application/ports/venue.repository';
import { Venue } from '../../domain/venue.entity';
import { ObjectId } from 'mongodb';
import { Inject } from '@nestjs/common';
import { generateUniqueSlug } from '@shared/utils';
import { VenuePresenter } from '../../presentation/venue.presenter';
import { VenueResponse } from '../../presentation/dto/venue.response';

@CommandHandler(CreateVenueCommand)
export class CreateVenueHandler
  implements ICommandHandler<CreateVenueCommand, VenueResponse>
{
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
  ) {}

  async execute(command: CreateVenueCommand): Promise<VenueResponse> {
    const { payload } = command;

    const venue = await Venue.create(
      payload,
      () => new ObjectId().toString(),
      (name) =>
        generateUniqueSlug(name, (slug) => this.venueRepo.existsBySlug(slug)),
    );

    await this.venueRepo.save(venue);
    return VenuePresenter.toResponse(venue);
  }
}
