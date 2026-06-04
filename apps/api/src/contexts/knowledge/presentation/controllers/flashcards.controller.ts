import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { FlashcardsService } from '../../application/services/flashcards.service';

@ApiTags('Flashcards')
@ApiBearerAuth()
@Controller('flashcards')
@UseGuards(JwtAuthGuard)
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @ApiOperation({ summary: 'Get all vocabulary decks for the user' })
  @Get('decks')
  async getDecks(@User('id') userId: string) {
    return this.flashcardsService.getDecks(userId);
  }

  @ApiOperation({ summary: 'Create a new flashcard vocabulary deck' })
  @Post('decks')
  async createDeck(
    @User('id') userId: string,
    @Body() data: { title: string; description?: string; colorTheme?: string },
  ) {
    return this.flashcardsService.createDeck(userId, data);
  }

  @ApiOperation({ summary: 'Delete an entire deck and all its flashcards' })
  @Delete('decks/:id')
  async deleteDeck(@User('id') userId: string, @Param('id') id: string) {
    return this.flashcardsService.deleteDeck(userId, id);
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
    return this.flashcardsService.forgeCard(userId, data);
  }

  @ApiOperation({ summary: 'Get all cards due hằng ngày for spaced repetition review' })
  @Get('due')
  async getDueCards(@User('id') userId: string, @Query('deckId') deckId?: string) {
    return this.flashcardsService.getDueCards(userId, deckId);
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
    return this.flashcardsService.reviewCard(userId, data.cardId, data.rating, data.responseTimeMs);
  }
}
