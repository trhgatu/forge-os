import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteDeckCommand } from './delete-deck.command';
import { FlashcardRepository } from '../../../domain/flashcard.repository';
import { DeckId } from '../../../domain/value-objects/deck-id.vo';

@CommandHandler(DeleteDeckCommand)
export class DeleteDeckHandler implements ICommandHandler<DeleteDeckCommand, { success: boolean }> {
  constructor(
    @Inject('FlashcardRepository')
    private readonly repo: FlashcardRepository,
  ) {}

  async execute(command: DeleteDeckCommand): Promise<{ success: boolean }> {
    const deckId = DeckId.fromString(command.id);
    await this.repo.deleteDeck(deckId, command.userId);
    return { success: true };
  }
}
