import { GetDecksHandler } from './get-decks/get-decks.handler';
import { GetDueCardsHandler } from './get-due-cards/get-due-cards.handler';

export * from './get-decks/get-decks.query';
export * from './get-due-cards/get-due-cards.query';

export const FlashcardQueryHandlers = [GetDecksHandler, GetDueCardsHandler];
