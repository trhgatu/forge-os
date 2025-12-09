import { Journal } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { JournalDocument } from '../journal.schema';

export class JournalMapper {
  static toDomain(doc: JournalDocument): Journal {
    return Journal.create(
      {
        title: doc.title,
        content: doc.content,
        mood: doc.mood,
        tags: doc.tags ?? [],
        date: doc.date,
        isDeleted: doc.isDeleted,
        deletedAt: doc.deletedAt,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      JournalId.create(doc._id),
    );
  }

  static toPersistence(journal: Journal) {
    const props = journal.toPrimitives();
    return {
      _id: props.id,
      title: props.title,
      content: props.content,
      mood: props.mood,
      tags: props.tags,
      date: props.date,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
