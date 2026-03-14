import { Journal } from '../domain/journal.entity';
import { JournalResponse } from '../presentation/dto/journal.response';

export class JournalPresenter {
  static toResponse(journal: Journal): JournalResponse {
    const props = journal.toPrimitives();
    return {
      id: props.id,
      title: props.title ?? '',
      content: props.content,
      mood: props.mood,
      tags: props.tags ?? [],
      type: props.type,
      status: props.status,
      source: props.source,
      relations: props.relations || [],
      createdAt: new Date(props.createdAt).toISOString(),
      updatedAt: new Date(props.updatedAt).toISOString(),
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt ? new Date(props.deletedAt).toISOString() : null,
    };
  }

  static toSummaryResponse(journal: Journal): any {
    const props = journal.toPrimitives();
    return {
      id: props.id,
      title: props.title || 'Untitled Thought',
      preview: props.content.substring(0, 100) + '...',
      mood: props.mood,
      type: props.type,
      createdAt: new Date(props.createdAt).toISOString(),
    };
  }
}
