import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QuoteStatus } from '@shared/enums';

export interface UpdateQuotePayload {
  content?: Map<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  status?: QuoteStatus;
}

export class UpdateQuoteCommand {
  constructor(
    public readonly id: QuoteId,
    public readonly payload: UpdateQuotePayload,
    public readonly lang: string = 'en',
  ) {}
}
