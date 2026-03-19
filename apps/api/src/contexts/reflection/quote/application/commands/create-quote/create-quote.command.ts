import { Command } from '@nestjs/cqrs';
import { QuoteStatus, MoodType } from '@shared/enums';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';

export interface CreateQuotePayload {
  readonly content: Record<string, string>;
  readonly author?: string;
  readonly source?: string;
  readonly tags?: string[];
  readonly status?: QuoteStatus;
  readonly mood?: MoodType;
}

export class CreateQuoteCommand extends Command<QuoteResponse> {
  constructor(
    public readonly payload: CreateQuotePayload,
    public readonly lang: string = 'en',
  ) {
    super();
  }
}
