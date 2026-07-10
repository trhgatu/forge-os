import { Deck } from './deck.entity';
import { Card } from './card.entity';
import { DeckId } from './value-objects/deck-id.vo';
import { CardId } from './value-objects/card-id.vo';

export interface FlashcardRepository {
  saveDeck(deck: Deck): Promise<void>;
  deleteDeck(id: DeckId, userId: string): Promise<void>;
  findDeckById(id: DeckId, userId: string): Promise<Deck | null>;
  findDecks(userId: string): Promise<Deck[]>;
  saveCard(card: Card): Promise<void>;
  findCardById(id: CardId, userId: string): Promise<Card | null>;
  logReview(data: {
    cardId: string;
    userId: string;
    rating: number;
    previousInterval: number;
    newInterval: number;
    previousEasiness: number;
    newEasiness: number;
    responseTimeMs: number;
  }): Promise<void>;
}
export const FlashcardRepository = Symbol('FlashcardRepository');
