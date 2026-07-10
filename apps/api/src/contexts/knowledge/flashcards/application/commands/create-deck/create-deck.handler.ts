import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDeckCommand } from './create-deck.command';
import { FlashcardRepository } from '../../../domain/flashcard.repository';
import { Deck } from '../../../domain/deck.entity';
import { DeckId } from '../../../domain/value-objects/deck-id.vo';

@CommandHandler(CreateDeckCommand)
export class CreateDeckHandler implements ICommandHandler<CreateDeckCommand, Deck> {
  constructor(
    @Inject('FlashcardRepository')
    private readonly repo: FlashcardRepository,
  ) {}

  async execute(command: CreateDeckCommand): Promise<Deck> {
    const { payload } = command;
    const deckId = DeckId.random();

    const deck = Deck.create(
      {
        userId: payload.userId,
        title: payload.title,
        description: payload.description,
        colorTheme: payload.colorTheme,
      },
      deckId,
    );

    await this.repo.saveDeck(deck);
    return deck;
  }
}
