import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { DeleteQuoteCommand } from '../delete-quote/delete-quote.command';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteModifiedEvent } from '../../events/quote-modified.event';

@CommandHandler(DeleteQuoteCommand)
export class DeleteQuoteHandler implements ICommandHandler<DeleteQuoteCommand, void> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteQuoteCommand): Promise<void> {
    const { id } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found to delete');

    await this.quoteRepo.delete(id);

    const quoteContext = this.publisher.mergeObjectContext(quote);
    quoteContext.apply(new QuoteModifiedEvent(id.value, 'hard-delete'));
    quoteContext.commit();
  }
}
