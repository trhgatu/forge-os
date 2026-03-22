import { Quote as PrismaQuoteModel, Prisma } from '@forgeos/database';
import { Quote } from '../../../domain/entities/quote.entity';
import { QuoteStatus } from '@shared/enums';

type PrismaQuote = PrismaQuoteModel;
type QuotePersistence = Prisma.QuoteUncheckedCreateInput;

export class QuoteMapper {
  static toDomain(raw: PrismaQuote): Quote {
    const content = raw.content as Record<string, string>;

    return Quote.createFromPersistence(raw.id, {
      id: raw.id,
      content,
      author: raw.author,
      source: raw.source ?? undefined,
      mood: raw.mood ?? undefined,
      status: raw.status as QuoteStatus,
      tags: raw.tags,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt ?? undefined,
    });
  }

  static toPersistence(entity: Quote): QuotePersistence {
    const props = entity.toPersistence();
    const contentJson =
      props.content instanceof Map ? Object.fromEntries(props.content) : props.content;

    return {
      id: props.id,
      content: contentJson as Prisma.InputJsonValue,
      author: props.author ?? 'Unknown',
      source: props.source ?? null,
      mood: props.mood ?? null,
      status: props.status,
      tags: props.tags,
      isDeleted: props.isDeleted,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt ?? null,
      v: 0,
    };
  }
}
