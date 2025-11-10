// infrastructure/repositories/court.mapper.ts
import { Types } from 'mongoose';
import { Court } from '../../domain/court.entity';
import { CourtDocument } from '../court.schema';
import { CourtStatus, SportType } from '@shared/enums';

export class CourtMapper {
  static toDomain(doc: CourtDocument): Court {
    return Court.createFromPersistence({
      id: doc._id.toString(),
      venueId: doc.venueId.toString(),
      name: doc.name,
      slug: doc.slug,
      sportType: doc.sportType as SportType,
      status: doc.status as CourtStatus,
      description: doc.description,
      images: doc.images,
      coverImage: doc.coverImage,
      pricePerHour: doc.pricePerHour,
      isIndoor: doc.isIndoor,
      maxPlayers: doc.maxPlayers,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
    });
  }

  static toPersistence(entity: Court): Partial<CourtDocument> {
    const props = entity.toPersistence();
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      name: props.name,
      slug: props.slug,
      venueId: props.venueId ? new Types.ObjectId(props.venueId) : undefined,
      sportType: props.sportType,
      status: props.status,
      description: props.description,
      images: props.images,
      coverImage: props.coverImage,
      pricePerHour: props.pricePerHour,
      isIndoor: props.isIndoor,
      maxPlayers: props.maxPlayers,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
