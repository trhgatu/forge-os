import { Injectable } from '@nestjs/common';

@Injectable()
export class FlashcardPresenter {
  deckToResponse(deck: any) {
    const data = typeof deck.toPersistence === 'function' ? deck.toPersistence() : deck;
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      colorTheme: data.colorTheme,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      _count: data._count,
    };
  }

  deckToResponseArray(decks: any[]) {
    return decks.map((d) => this.deckToResponse(d));
  }

  cardToResponse(card: any) {
    const data = typeof card.toPersistence === 'function' ? card.toPersistence() : card;
    return {
      id: data.id,
      userId: data.userId,
      deckId: data.deckId,
      vocabularyId: data.vocabularyId,
      conceptId: data.conceptId,
      highlightText: data.highlightText,
      personalNote: data.personalNote,
      customFront: data.customFront,
      customBack: data.customBack,
      interval: data.interval,
      easiness: data.easiness,
      repetitions: data.repetitions,
      state: data.state,
      nextReviewDate: data.nextReviewDate,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      vocabulary: data.vocabulary,
      concept: data.concept,
    };
  }

  cardToResponseArray(cards: any[]) {
    return cards.map((c) => this.cardToResponse(c));
  }
}
