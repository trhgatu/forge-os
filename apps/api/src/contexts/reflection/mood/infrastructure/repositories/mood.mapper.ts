import { Mood } from '../../domain/mood.entity';
import { MoodId } from '../../domain/value-objects/mood-id.vo';
import { MoodDocument } from '../mood.schema';

export class MoodMapper {
  static toDomain(doc: MoodDocument): Mood {
    return Mood.create(
      {
        mood: doc.mood,
        note: doc.note,
        tags: doc.tags ?? [],
        loggedAt: doc.loggedAt,
        isDeleted: doc.isDeleted,
        deletedAt: doc.deletedAt,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      MoodId.create(doc._id as any),
    );
  }

  static toPersistence(mood: Mood) {
    const props = mood.toPrimitives();
    return {
      _id: props.id,
      mood: props.mood,
      note: props.note,
      tags: props.tags,
      loggedAt: props.loggedAt,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
