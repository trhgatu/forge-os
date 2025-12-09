import { Types } from 'mongoose';
import { Journal } from '../../domain/journal.entity';
import { JournalDocument } from '../journal.schema';
import { MoodType } from '@shared/enums';
import { JournalStatus } from '../../domain/enums/journal-status.enum';
import { JournalType } from '../../domain/enums/journal-type.enum';

export class JournalMapper {
  static toDomain(doc: JournalDocument): Journal {
    return Journal.createFromPersistence({
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      mood: doc.mood as MoodType,
      tags: doc.tags ?? [],
      type: doc.type as JournalType,
      status: doc.status as JournalStatus,
      source: doc.source as 'user' | 'ai' | 'system',
      relations: doc.relations ?? [],
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Journal): Partial<JournalDocument> {
    const props = entity.toPersistence();

    return {
      _id: new Types.ObjectId(entity.id.toString()),
      title: props.title,
      content: props.content,
      mood: props.mood,
      tags: props.tags,
      type: props.type,
      status: props.status,
      source: props.source,
      relations: props.relations,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
