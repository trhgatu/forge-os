import { QuoteStatus, MoodType } from '@shared/enums';
import { QuoteId } from '../../../domain/value-objects/quote-id.vo';

export interface UpdateQuotePayload {
  readonly content?: Record<string, string>;
  readonly author?: string;
  readonly source?: string;
  readonly tags?: string[];
  readonly status?: QuoteStatus;
  readonly mood?: MoodType;
}

export class UpdateQuoteCommand {
  constructor(
    public readonly id: QuoteId,
    public readonly payload: UpdateQuotePayload,
    public readonly lang: string = 'en',
  ) {}
}
