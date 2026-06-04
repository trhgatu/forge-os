import { Mood } from '../../domain/mood.entity';

export class MoodMapper {
  static toDomain(doc: any): Mood | null {
    if (!doc) return null;

    return Mood.createFromPersistence(
      {
        mood: doc.mood,
        note: doc.note,
        intensity: doc.intensity,
        tags: doc.tags || [],
        loggedAt: doc.loggedAt,
        isDeleted: doc.isDeleted || false,
        deletedAt: doc.deletedAt,
        userId: doc.userId || undefined,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toPersistence(entity: Mood): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.value,
      mood: props.mood,
      note: props.note,
      intensity: props.intensity,
      tags: props.tags,
      loggedAt: props.loggedAt,
      userId: props.userId || null,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
