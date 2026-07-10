import { Deck as DeckEntity } from '../../domain/deck.entity';
import { Card as CardEntity } from '../../domain/card.entity';
import { FlashcardDeck as PrismaDeck, UserFlashcard as PrismaCard } from '@prisma/client';

export class FlashcardMapper {
  static deckToDomain(raw: PrismaDeck): DeckEntity {
    return DeckEntity.createFromPersistence(
      {
        userId: raw.userId,
        title: raw.title,
        description: raw.description,
        colorTheme: raw.colorTheme ?? 'from-indigo-500 to-cyan-500',
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static deckToPersistence(entity: DeckEntity): PrismaDeck {
    const raw = entity.toPersistence();
    return {
      id: raw.id,
      userId: raw.userId,
      title: raw.title,
      description: raw.description ?? null,
      colorTheme: raw.colorTheme,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static cardToDomain(raw: PrismaCard): CardEntity {
    return CardEntity.createFromPersistence(
      {
        userId: raw.userId,
        deckId: raw.deckId,
        vocabularyId: raw.vocabularyId ?? '',
        conceptId: raw.conceptId,
        highlightText: raw.highlightText,
        personalNote: raw.personalNote,
        customFront: raw.customFront,
        customBack: raw.customBack,
        interval: raw.interval,
        easiness: raw.easiness,
        repetitions: raw.repetitions,
        state: raw.state,
        nextReviewDate: raw.nextReviewDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static cardToPersistence(entity: CardEntity): PrismaCard {
    const raw = entity.toPersistence();
    return {
      id: raw.id,
      userId: raw.userId,
      deckId: raw.deckId,
      vocabularyId: raw.vocabularyId,
      conceptId: raw.conceptId ?? null,
      highlightText: raw.highlightText ?? null,
      personalNote: raw.personalNote ?? null,
      customFront: raw.customFront ?? null,
      customBack: raw.customBack ?? null,
      interval: raw.interval,
      easiness: raw.easiness,
      repetitions: raw.repetitions,
      state: raw.state,
      nextReviewDate: raw.nextReviewDate,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
