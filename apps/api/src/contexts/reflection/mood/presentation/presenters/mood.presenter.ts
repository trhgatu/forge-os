import { Injectable } from '@nestjs/common';
import { MoodResponse } from '../dto/mood.response';
import { Mood } from '../../domain/mood.entity';

@Injectable()
export class MoodPresenter {
  toResponse(mood: Mood): MoodResponse {
    const data = mood.toPrimitives();

    return {
      id: String(data.id),
      mood: data.mood,
      note: data.note,
      intensity: data.intensity,
      tags: data.tags,
      loggedAt: data.loggedAt instanceof Date ? data.loggedAt.toISOString() : (data.loggedAt ?? ''),
      createdAt:
        data.createdAt instanceof Date ? data.createdAt.toISOString() : (data.createdAt ?? ''),
      updatedAt:
        data.updatedAt instanceof Date ? data.updatedAt.toISOString() : (data.updatedAt ?? ''),
      isDeleted: data.isDeleted,
      deletedAt: data.deletedAt instanceof Date ? data.deletedAt.toISOString() : undefined,
      userId: data.userId,
    };
  }

  toResponseArray(moods: Mood[]): MoodResponse[] {
    return moods.map((m) => this.toResponse(m));
  }
}
