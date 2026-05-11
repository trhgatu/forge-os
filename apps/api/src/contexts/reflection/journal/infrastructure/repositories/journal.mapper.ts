import { Journal as PrismaJournal } from '../../../../../../prisma/generated-client';
import { Journal } from '../../domain/journal.entity';
import { JournalSource } from '../../domain/enums';

export class JournalMapper {
  static toDomain(doc: PrismaJournal): Journal | null {
    if (!doc) return null;

    return Journal.createFromPersistence(
      {
        title: doc.title || '',
        content: doc.content,
        mood: doc.mood as any,
        tags: (doc.tags as string[]) || [],
        type: doc.type as any,
        status: doc.status as any,
        source: (doc.source as any) || JournalSource.USER,
        relations: (doc.relations as any) || [],
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
      doc.isDeleted || false,
      doc.deletedAt ?? undefined,
    );
  }

  static toPersistence(entity: Journal): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.toString(),
      title: props.title,
      content: props.content,
      mood: props.mood,
      tags: props.tags,
      type: props.type,
      status: props.status,
      source: props.source,
      relations: props.relations,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
