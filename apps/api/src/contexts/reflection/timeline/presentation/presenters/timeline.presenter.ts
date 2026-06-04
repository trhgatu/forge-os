import { PaginatedResponse } from '@shared/types';
import { TimelineResponse } from '../dto/timeline.response';

export class TimelinePresenter {
  static toResponse(timelineData: PaginatedResponse<TimelineResponse>) {
    return {
      data: timelineData.data.map((item) => ({
        id: item.id,
        userId: item.userId,
        type: item.type,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        ...((item.type as string) === 'memory' && {
          title: (item as any).title,
          content: (item as any).content,
          imageUrl: (item as any).imageUrl,
          tags: (item as any).tags,
          isPublic: (item as any).isPublic,
        }),
        ...((item.type as string) === 'journal' && {
          title: (item as any).title,
          content: (item as any).content,
          moodScore: (item as any).moodScore,
          tags: (item as any).tags,
          isPublic: (item as any).isPublic,
        }),
        ...((item.type as string) === 'mood' && {
          score: (item as any).score,
          note: (item as any).note,
          activities: (item as any).activities,
          emotions: (item as any).emotions,
        }),
      })),
      meta: timelineData.meta,
    };
  }
}
