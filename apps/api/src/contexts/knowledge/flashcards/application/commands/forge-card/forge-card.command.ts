export interface ForgeCardPayload {
  userId: string;
  deckId: string;
  word: string;
  conceptId?: string;
  highlightText?: string;
  personalNote?: string;
}

export class ForgeCardCommand {
  constructor(public readonly payload: ForgeCardPayload) {}
}
