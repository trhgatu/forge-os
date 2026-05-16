import { Quote } from '../../domain/quote.entity';

export class QuoteMapper {
  static toDomain(doc: any): Quote | null {
    if (!doc) return null;

    return Quote.createFromPersistence(
      {
        content:
          doc.content instanceof Map ? doc.content : new Map(Object.entries(doc.content || {})),
        author: doc.author,
        source: doc.source,
        tags: doc.tags || [],
        mood: doc.mood,
        status: doc.status,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
      doc.isDeleted || false,
      doc.deletedAt,
    );
  }

  static toPersistence(entity: Quote): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.toString(),
      content: Object.fromEntries(props.content),
      author: props.author,
      source: props.source,
      tags: props.tags,
      mood: props.mood,
      status: props.status,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
    };
  }
}
