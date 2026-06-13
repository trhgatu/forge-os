import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ReviewCardCommand } from './review-card.command';
import { FlashcardRepository } from '../../../domain/flashcard.repository';
import { CardId } from '../../../domain/value-objects/card-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(ReviewCardCommand)
export class ReviewCardHandler implements ICommandHandler<ReviewCardCommand, any> {
  constructor(
    @Inject('FlashcardRepository')
    private readonly repo: FlashcardRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: ReviewCardCommand): Promise<any> {
    const { payload } = command;
    const cardId = CardId.fromString(payload.cardId);

    const card = await this.repo.findCardById(cardId, payload.userId);
    if (!card) {
      throw new NotFoundException('Không tìm thấy thẻ học của bạn.');
    }

    const sm2Result = card.review(payload.rating);

    // Write card updates to DB
    await this.repo.saveCard(card);

    // Create review log
    await this.repo.logReview({
      cardId: payload.cardId,
      userId: payload.userId,
      rating: payload.rating,
      previousInterval: sm2Result.prevInterval,
      newInterval: sm2Result.newInterval,
      previousEasiness: sm2Result.prevEasiness,
      newEasiness: sm2Result.newEasiness,
      responseTimeMs: payload.responseTimeMs,
    });

    // Fetch vocabulary to return as expected by client
    const vocab = await this.prisma.vocabulary.findUnique({
      where: { id: card.vocabularyId },
    });

    return {
      ...card.toPersistence(),
      vocabulary: vocab,
    };
  }
}
