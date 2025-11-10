import { Venue } from '../domain/venue.entity';
import { VenueResponse } from '../presentation/dto/venue.response';

export class VenuePresenter {
  static toResponse(venue: Venue): VenueResponse {
    const props = venue.toPrimitives();

    return {
      id: props.id,
      name: props.name,
      slug: props.slug,
      location: props.location,
      sportType: props.sportType,
      status: props.status,
      description: props.description,
      coordinates: props.coordinates,
      coverImage: props.coverImage,
      images: props.images,
      numOfCourts: props.numOfCourts,
      phoneNumber: props.phoneNumber,
      email: props.email,
      website: props.website,
      openHour: props.openHour,
      closeHour: props.closeHour,
      pricePerHour: props.pricePerHour,
      ownerId: props.ownerId,
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
    };
  }
}
