import { CreateDeckHandler } from './create-deck/create-deck.handler';
import { DeleteDeckHandler } from './delete-deck/delete-deck.handler';
import { ForgeCardHandler } from './forge-card/forge-card.handler';
import { ReviewCardHandler } from './review-card/review-card.handler';

export * from './create-deck/create-deck.command';
export * from './delete-deck/delete-deck.command';
export * from './forge-card/forge-card.command';
export * from './review-card/review-card.command';

export const FlashcardCommandHandlers = [
  CreateDeckHandler,
  DeleteDeckHandler,
  ForgeCardHandler,
  ReviewCardHandler,
];
