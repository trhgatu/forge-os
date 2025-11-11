import { Quote } from '../domain/quote.entity';
import { QuoteResponse } from './dto/quote.response';

export class QuotePresenter {
  static toResponse(quote: Quote, lang: string): QuoteResponse {
    const props = quote.toPrimitives(lang);

    return {
      id: props.id,
      content: props.content,
      author: props.author,
      source: props.source,
      tags: props.tags ?? [],
      status: props.status,
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
    };
  }
}
