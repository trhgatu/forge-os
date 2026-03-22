import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { RestoreQuoteCommand } from './restore-quote.command';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';

@CommandHandler(RestoreQuoteCommand)
export class RestoreQuoteHandler implements ICommandHandler<RestoreQuoteCommand, QuoteResponse> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RestoreQuoteCommand): Promise<QuoteResponse> {
    const { id, lang } = command;

    const rawQuote = await this.quoteRepo.findById(id);
    if (!rawQuote) throw new NotFoundException('Quote not found');

    const quote = this.publisher.mergeObjectContext(rawQuote);

    quote.restore();

    await this.quoteRepo.save(quote);
    quote.commit();

    return QuoteResponse.fromEntity(quote, lang);
  }
}
