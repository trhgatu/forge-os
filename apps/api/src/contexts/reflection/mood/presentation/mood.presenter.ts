import { MoodResponse } from './dto/mood.response';

export class MoodPresenter {
  static toResponse(mood: any): MoodResponse {
    const data = typeof mood.toPrimitives === 'function' ? mood.toPrimitives() : mood;

    return {
      id: String(data.id),
      mood: data.mood,
      note: data.note,
      tags: data.tags,
      loggedAt: data.loggedAt instanceof Date ? data.loggedAt.toISOString() : (data.loggedAt ?? ''),
      createdAt:
        data.createdAt instanceof Date ? data.createdAt.toISOString() : (data.createdAt ?? ''),
      updatedAt:
        data.updatedAt instanceof Date ? data.updatedAt.toISOString() : (data.updatedAt ?? ''),
      isDeleted: data.isDeleted,
      deletedAt:
        data.deletedAt instanceof Date ? data.deletedAt.toISOString() : (data.deletedAt ?? null),
    };
  }
}
