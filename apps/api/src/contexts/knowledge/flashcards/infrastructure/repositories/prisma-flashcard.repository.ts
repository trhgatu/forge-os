import { Injectable, NotFoundException } from '@nestjs/common';
import { FlashcardRepository } from '../../domain/flashcard.repository';
import { Deck as DeckEntity } from '../../domain/deck.entity';
import { Card as CardEntity } from '../../domain/card.entity';
import { DeckId } from '../../domain/value-objects/deck-id.vo';
import { CardId } from '../../domain/value-objects/card-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { FlashcardMapper } from './flashcard.mapper';

@Injectable()
export class PrismaFlashcardRepository implements FlashcardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveDeck(deck: DeckEntity): Promise<void> {
    const data = FlashcardMapper.deckToPersistence(deck);
    await this.prisma.flashcardDeck.upsert({
      where: { id: data.id },
      update: {
        title: data.title,
        description: data.description,
        colorTheme: data.colorTheme,
      },
      create: data,
    });
  }

  async deleteDeck(id: DeckId, userId: string): Promise<void> {
    const deck = await this.prisma.flashcardDeck.findFirst({
      where: { id: id.toString(), userId },
    });
    if (!deck) {
      throw new NotFoundException('Không tìm thấy bộ thẻ.');
    }
    await this.prisma.flashcardDeck.delete({
      where: { id: id.toString() },
    });
  }

  async findDeckById(id: DeckId, userId: string): Promise<DeckEntity | null> {
    const doc = await this.prisma.flashcardDeck.findFirst({
      where: { id: id.toString(), userId },
    });
    return doc ? FlashcardMapper.deckToDomain(doc) : null;
  }

  async findDecks(userId: string): Promise<DeckEntity[]> {
    const data = await this.prisma.flashcardDeck.findMany({
      where: { userId },
    });
    return data.map((doc) => FlashcardMapper.deckToDomain(doc));
  }

  async saveCard(card: CardEntity): Promise<void> {
    const data = FlashcardMapper.cardToPersistence(card);
    await this.prisma.userFlashcard.upsert({
      where: { id: data.id },
      update: {
        interval: data.interval,
        easiness: data.easiness,
        repetitions: data.repetitions,
        state: data.state,
        nextReviewDate: data.nextReviewDate,
        customFront: data.customFront,
        customBack: data.customBack,
        highlightText: data.highlightText,
        personalNote: data.personalNote,
      },
      create: data,
    });
  }

  async findCardById(id: CardId, userId: string): Promise<CardEntity | null> {
    const doc = await this.prisma.userFlashcard.findFirst({
      where: { id: id.toString(), userId },
    });
    return doc ? FlashcardMapper.cardToDomain(doc) : null;
  }

  async logReview(data: {
    cardId: string;
    userId: string;
    rating: number;
    previousInterval: number;
    newInterval: number;
    previousEasiness: number;
    newEasiness: number;
    responseTimeMs: number;
  }): Promise<void> {
    await this.prisma.flashcardReviewLog.create({
      data,
    });
  }
}
export const PrismaFlashcardRepositoryProvider = {
  provide: 'FlashcardRepository',
  useClass: PrismaFlashcardRepository,
};
