import { Court } from '../domain/court.entity';
import { CourtResponse } from '../presentation/dto/court.response';

export class CourtPresenter {
  static toResponse(court: Court): CourtResponse {
    const props = court.toPrimitives();

    return {
      id: props.id,
      name: props.name,
      slug: props.slug,
      sportType: props.sportType,
      status: props.status,
      description: props.description,
      coverImage: props.coverImage,
      images: props.images,
      pricePerHour: props.pricePerHour,
      isIndoor: props.isIndoor ?? null,
      maxPlayers: props.maxPlayers,
      venueId: props.venueId,
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
    };
  }
}
