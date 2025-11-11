import { Types } from 'mongoose';
import { Memory } from '../../domain/memory.entity';
import { MemoryDocument } from '../memory.schema';
import { MemoryStatus, MoodType } from '@shared/enums';

export class MemoryMapper {
  static toDomain(doc: MemoryDocument): Memory {
    return Memory.createFromPersistence({
      id: doc._id.toString(),
      title: new Map(doc.title),
      content: new Map(doc.content),
      mood: doc.mood as MoodType,
      tags: doc.tags,
      status: doc.status as MemoryStatus,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Memory): Partial<MemoryDocument> {
    const props = entity.toPersistence();
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      title: props.title,
      content: props.content,
      mood: props.mood,
      tags: props.tags,
      status: props.status,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
