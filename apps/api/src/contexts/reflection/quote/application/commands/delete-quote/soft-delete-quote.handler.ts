import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { SoftDeleteQuoteCommand } from './soft-delete-quote.command';
import { QuoteRepository } from '../../../domain/repositories/quote.repository';
import { QuoteResponse } from '../../../infrastructure/http/responses/quote.response';

@CommandHandler(SoftDeleteQuoteCommand)
export class SoftDeleteQuoteHandler implements ICommandHandler<
  SoftDeleteQuoteCommand,
  QuoteResponse
> {
  constructor(
    private readonly quoteRepo: QuoteRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SoftDeleteQuoteCommand): Promise<QuoteResponse> {
    const { id } = command;

    const rawQuote = await this.quoteRepo.findById(id);
    if (!rawQuote)
      throw new NotFoundException(`Quote with ID ${id.value} not found to soft delete`);

    const quote = this.publisher.mergeObjectContext(rawQuote);

    quote.softDelete();

    await this.quoteRepo.save(quote);

    quote.commit();

    return QuoteResponse.fromEntity(quote);
  }
}
