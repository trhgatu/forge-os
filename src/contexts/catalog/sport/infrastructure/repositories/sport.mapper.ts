// infrastructure/repositories/sport.mapper.ts
import { Types } from 'mongoose';
import { Sport } from '../../domain/sport.entity';
import { SportDocument } from '../sport.schema';
import { SportStatus } from '@shared/enums';

export class SportMapper {
  static toDomain(doc: SportDocument): Sport {
    return Sport.createFromPersistence({
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      icon: doc.icon,
      description: doc.description,
      status: doc.status as SportStatus,
      sortOrder: doc.sortOrder,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
    });
  }

  static toPersistence(entity: Sport): Partial<SportDocument> {
    const props = entity.toPersistence();

    return {
      _id: new Types.ObjectId(props.id),
      name: props.name,
      slug: props.slug,
      icon: props.icon,
      description: props.description,
      status: props.status,
      sortOrder: props.sortOrder,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
