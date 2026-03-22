import { Quote } from '../../../domain/entities/quote.entity';
import { QuoteStatus } from '@shared/enums';

export class QuoteResponse {
  readonly id: string;
  readonly content: string;
  readonly author: string;
  readonly source?: string;
  readonly tags: string[];
  readonly mood?: string;
  readonly status: QuoteStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly isDeleted: boolean;

  private constructor(entity: Quote, lang: string) {
    this.id = entity.id.value;
    this.content = entity.localizedContent(lang);
    this.author = entity.author ?? 'Unknown';
    this.source = entity.source;
    this.tags = entity.tags;
    this.mood = entity.mood;
    this.status = entity.status;
    this.createdAt = entity.createdAt.toISOString();
    this.updatedAt = entity.updatedAt.toISOString();
    this.isDeleted = entity.isDeleted;
  }

  static fromEntity(entity: Quote, lang: string = 'en'): QuoteResponse {
    return new QuoteResponse(entity, lang);
  }

  static fromEntities(entities: Quote[], lang: string = 'en'): QuoteResponse[] {
    return entities.map((entity) => this.fromEntity(entity, lang));
  }
}
