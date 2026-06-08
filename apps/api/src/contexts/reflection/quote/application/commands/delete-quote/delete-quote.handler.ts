import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException, Inject } from '@nestjs/common';
import { DeleteQuoteCommand } from './delete-quote.command';
import { QuoteRepository } from '../../../domain/quote.repository';
import { QuoteModifiedEvent } from '../../events/quote-modified.event';

@CommandHandler(DeleteQuoteCommand)
export class DeleteQuoteHandler implements ICommandHandler<DeleteQuoteCommand, void> {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepo: QuoteRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteQuoteCommand): Promise<void> {
    const { id } = command;

    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new NotFoundException('Quote not found');

    await this.quoteRepo.delete(id);
    this.eventBus.publish(new QuoteModifiedEvent(id, 'delete'));
  }
}
