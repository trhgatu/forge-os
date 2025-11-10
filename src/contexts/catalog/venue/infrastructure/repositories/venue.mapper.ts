import { Types } from 'mongoose';
import { Venue } from '../../domain/venue.entity';
import { VenueDocument } from '../venue.schema';
import { SportType, VenueStatus } from '@shared/enums';

export class VenueMapper {
  static toDomain(doc: VenueDocument): Venue {
    return Venue.createFromPersistence({
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      location: doc.location,
      sportType: doc.sportType as SportType,
      status: doc.status as VenueStatus,
      description: doc.description,
      coordinates: doc.coordinates,
      coverImage: doc.coverImage,
      images: doc.images,
      numOfCourts: doc.numOfCourts,
      phoneNumber: doc.phoneNumber,
      email: doc.email,
      website: doc.website,
      openHour: doc.openHour,
      closeHour: doc.closeHour,
      pricePerHour: doc.pricePerHour,
      ownerId: doc.ownerId ? doc.ownerId.toString() : undefined,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
    });
  }

  static toPersistence(entity: Venue): Partial<VenueDocument> {
    const props = entity.toPersistence();

    return {
      _id: new Types.ObjectId(entity.id.toString()),
      name: props.name,
      slug: props.slug!,
      location: props.location,
      sportType: props.sportType as SportType,
      status: props.status as VenueStatus,
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
      ownerId: props.ownerId ? new Types.ObjectId(props.ownerId) : undefined,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
