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
      relations: props.relations ?? [],
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt?.toISOString() ?? null,
    };
  }
}
