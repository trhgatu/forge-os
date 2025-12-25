import { Types } from 'mongoose';
import { Quote } from '../../domain/quote.entity';
import { QuoteDocument } from '../quote.schema';
import { QuoteStatus } from '@shared/enums';

export class QuoteMapper {
  static toDomain(doc: QuoteDocument): Quote {
    return Quote.createFromPersistence({
      id: doc._id.toString(),
      content: new Map(doc.content),
      author: doc.author,
      source: doc.source,
      tags: doc.tags,
      mood: doc.mood,
      status: doc.status as QuoteStatus,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity: Quote): Partial<QuoteDocument> {
    const props = entity.toPersistence();
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      content: props.content,
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
