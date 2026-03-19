import { Quote as PrismaQuote } from '@forgeos/database';
import { Quote } from '../../../domain/entities/quote.entity';
import { QuoteStatus } from '@shared/enums';

export class QuoteMapper {
  static toDomain(raw: PrismaQuote): Quote {
    return Quote.createFromPersistence(raw.id, {
      ...raw,
      content: raw.content as Record<string, string>,
      author: raw.author ?? undefined,
      source: raw.source ?? undefined,
      mood: raw.mood ?? undefined,
      status: raw.status as QuoteStatus,
      deletedAt: raw.deletedAt ?? undefined,
    });
  }

  static toPersistence(entity: Quote) {
    const props = entity.toPersistence();

    return {
      id: props.id,
      content: Object.fromEntries(props.content),
      author: props.author,
      source: props.source,
      tags: props.tags,
      mood: props.mood,
      status: props.status,
      isDeleted: props.isDeleted,
      deletedAt: props.deletedAt,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
