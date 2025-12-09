import { Journal } from '../domain/journal.entity';
import { JournalResponse } from './dto/journal.response';

export class JournalPresenter {
  static toResponse(journal: Journal): JournalResponse {
    const props = journal.toPrimitives();
    return {
      id: props.id,
      title: props.title,
      content: props.content,
      mood: props.mood,
      tags: props.tags,
      date: props.date.toISOString(),
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt?.toISOString(),
    };
  }
}
