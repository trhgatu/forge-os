import { QuoteStatus } from '@shared/enums';

export interface CreateQuotePayload {
  content: Record<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  status?: QuoteStatus;
}

export class CreateQuoteCommand {
  constructor(
    public readonly payload: CreateQuotePayload,
    public readonly lang: string = 'en',
  ) {}
}
