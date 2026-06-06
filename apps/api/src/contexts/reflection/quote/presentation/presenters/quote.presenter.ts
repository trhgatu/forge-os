import { Injectable } from '@nestjs/common';
import { QuoteResponse } from '../dto/quote.response';

@Injectable()
export class QuotePresenter {
  toResponse(quote: any, lang: string): QuoteResponse {
    let contentStr = '';
    let author = quote.author;
    let source = quote.source;
    let tags = quote.tags ?? [];
    let mood = quote.mood;
    let status = quote.status;
    let createdAt = quote.createdAt;
    let updatedAt = quote.updatedAt;
    let isDeleted = quote.isDeleted;
    let id = '';

    if (typeof quote.toPrimitives === 'function') {
      const props = quote.toPrimitives(lang);
      id = props.id;
      contentStr = props.content;
      author = props.author;
      source = props.source;
      tags = props.tags ?? [];
      mood = props.mood;
      status = props.status;
      createdAt = props.createdAt;
      updatedAt = props.updatedAt;
      isDeleted = props.isDeleted;
    } else {
      id = quote.id || (quote._id?.value ?? '');
      const content = quote.content || quote.props?.content || {};
      if (content instanceof Map) {
        contentStr = content.get(lang) ?? content.get('en') ?? '';
      } else if (typeof content === 'object') {
        contentStr = content[lang] ?? content['en'] ?? '';
      }

      if (quote.props) {
        author = author ?? quote.props.author;
        source = source ?? quote.props.source;
        tags = tags ?? quote.props.tags ?? [];
        mood = mood ?? quote.props.mood;
        status = status ?? quote.props.status;
        createdAt = createdAt ?? quote.props.createdAt;
        updatedAt = updatedAt ?? quote.props.updatedAt;
      }
    }

    return {
      id,
      content: contentStr,
      author,
      source,
      tags,
      mood,
      status,
      createdAt:
        createdAt instanceof Date
          ? createdAt.toISOString()
          : typeof createdAt === 'string'
            ? createdAt
            : '',
      updatedAt:
        updatedAt instanceof Date
          ? updatedAt.toISOString()
          : typeof updatedAt === 'string'
            ? updatedAt
            : '',
      isDeleted,
    };
  }
}
