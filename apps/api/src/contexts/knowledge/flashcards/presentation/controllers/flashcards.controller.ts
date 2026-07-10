import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { FlashcardPresenter } from '../presenters/flashcard.presenter';
import {
  CreateDeckCommand,
  DeleteDeckCommand,
  ForgeCardCommand,
  ReviewCardCommand,
} from '../../application/commands';
import { GetDecksQuery, GetDueCardsQuery } from '../../application/queries';

@ApiTags('Flashcards')
@ApiBearerAuth()
@Controller('flashcards')
@UseGuards(JwtAuthGuard)
export class FlashcardsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: FlashcardPresenter,
  ) {}

  @ApiOperation({ summary: 'Get all vocabulary decks for the user' })
  @Get('decks')
  async getDecks(@User('id') userId: string) {
    const decks = await this.queryBus.execute(new GetDecksQuery(userId));
    return this.presenter.deckToResponseArray(decks);
  }

  @ApiOperation({ summary: 'Create a new flashcard vocabulary deck' })
  @Post('decks')
  async createDeck(
    @User('id') userId: string,
    @Body() data: { title: string; description?: string; colorTheme?: string },
  ) {
    const deck = await this.commandBus.execute(new CreateDeckCommand({ ...data, userId }));
    return this.presenter.deckToResponse(deck);
  }

  @ApiOperation({ summary: 'Delete an entire deck and all its flashcards' })
  @Delete('decks/:id')
  async deleteDeck(@User('id') userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteDeckCommand(id, userId));
  }

  @ApiOperation({
    summary: 'Forge a new flashcard, automatically enriching IPA, audios, and translation',
  })
  @Post('forge')
  async forgeCard(
    @User('id') userId: string,
    @Body()
    data: {
      deckId: string;
      word: string;
      conceptId?: string;
      highlightText?: string;
      personalNote?: string;
    },
  ) {
    const card = await this.commandBus.execute(new ForgeCardCommand({ ...data, userId }));
    return this.presenter.cardToResponse(card);
  }

  @ApiOperation({ summary: 'Get all cards due hằng ngày for spaced repetition review' })
  @Get('due')
  async getDueCards(@User('id') userId: string, @Query('deckId') deckId?: string) {
    const cards = await this.queryBus.execute(new GetDueCardsQuery(userId, deckId));
    return this.presenter.cardToResponseArray(cards);
  }

  @ApiOperation({ summary: 'Submit a card review (recalculates parameters using SM-2)' })
  @Post('review')
  async reviewCard(
    @User('id') userId: string,
    @Body()
    data: {
      cardId: string;
      rating: number; // 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
      responseTimeMs: number;
    },
  ) {
    const card = await this.commandBus.execute(new ReviewCardCommand({ ...data, userId }));
    return this.presenter.cardToResponse(card);
  }
}
