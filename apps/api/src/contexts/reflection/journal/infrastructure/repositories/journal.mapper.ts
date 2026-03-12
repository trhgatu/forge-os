import { Types } from 'mongoose';
import { Journal, JournalRelation } from '../../domain/journal.entity';
import { JournalDocument } from '../journal.schema';
import { MoodType } from '@shared/enums';
import { toEnum } from '@shared/utils';
import { JournalStatus, JournalType, JournalRelationType } from '../../domain/enums';

export class JournalMapper {
  static toDomain(doc: JournalDocument): Journal {
    const rawId = doc._id as unknown as Types.ObjectId | { $oid: string } | undefined;
    if (!rawId) throw new Error('Journal load failed: Missing _id');

    const id =
      typeof rawId === 'object' && '$oid' in rawId
        ? (rawId as { $oid: string }).$oid
        : rawId.toString();
    return Journal.createFromPersistence({
      id,
      title: doc.title,
      content: doc.content,
      mood: doc.mood as MoodType,
      tags: doc.tags ?? [],
      type: (doc.type as JournalType) ?? JournalType.THOUGHT,
      status: (doc.status as JournalStatus) ?? JournalStatus.PRIVATE,
      source: (doc.source as 'user' | 'ai' | 'system') ?? 'user',
      relations: (doc.relations ?? []).map(
        (r): JournalRelation => ({
          type: toEnum(JournalRelationType, r.type as string, JournalRelationType.JOURNAL),
          id: r.id,
        }),
      ),
      isDeleted: doc.isDeleted ?? false,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt ?? new Date(),
      updatedAt: doc.updatedAt ?? new Date(),
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
    } as unknown as Partial<JournalDocument>;
  }
}
