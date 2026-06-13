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
        imageUrl: doc.imageUrl || undefined,
        type: doc.type || undefined,
        createdBy: doc.createdBy || undefined,
        updatedBy: doc.updatedBy || undefined,
        createdAt: doc.createdAt
          ? doc.createdAt instanceof Date
            ? doc.createdAt
            : new Date(doc.createdAt)
          : new Date(),
        updatedAt: doc.updatedAt
          ? doc.updatedAt instanceof Date
            ? doc.updatedAt
            : new Date(doc.updatedAt)
          : new Date(),
      },
      doc.id,
      doc.isDeleted || false,
      doc.deletedAt
        ? doc.deletedAt instanceof Date
          ? doc.deletedAt
          : new Date(doc.deletedAt)
        : undefined,
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
      imageUrl: props.imageUrl || null,
      type: props.type || null,
      createdBy: props.createdBy || null,
      updatedBy: props.updatedBy || null,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
