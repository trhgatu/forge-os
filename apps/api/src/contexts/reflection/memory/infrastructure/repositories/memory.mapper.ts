import { Memory } from '../../domain/memory.entity';

export class MemoryMapper {
  static toDomain(doc: any): Memory | null {
    if (!doc) return null;

    return Memory.createFromPersistence(
      {
        title: doc.title instanceof Map ? doc.title : new Map(Object.entries(doc.title || {})),
        content:
          doc.content instanceof Map ? doc.content : new Map(Object.entries(doc.content || {})),
        mood: doc.mood,
        tags: doc.tags || [],
        status: doc.status,
        userId: doc.userId || undefined,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
      doc.isDeleted || false,
      doc.deletedAt,
    );
  }

  static toPersistence(entity: Memory): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.toString(),
      title: Object.fromEntries(props.title),
      content: Object.fromEntries(props.content),
      mood: props.mood,
      tags: props.tags,
      status: props.status,
      userId: props.userId || null,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
