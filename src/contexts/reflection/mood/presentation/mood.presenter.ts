import { Mood } from '../domain/mood.entity';
import { MoodResponse } from './dto/mood.response';

export class MoodPresenter {
  static toResponse(mood: Mood): MoodResponse {
    const props = mood.toPrimitives();
    return {
      id: props.id,
      mood: props.mood,
      note: props.note,
      tags: props.tags,
      loggedAt: props.loggedAt.toISOString(),
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt?.toISOString(),
    };
  }
}
