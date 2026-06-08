import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaQuoteRepository } from './infrastructure/repositories/prisma-quote.repository';
import { QuoteMapper } from './infrastructure/repositories/quote.mapper';
import { QuoteRepository } from './domain/quote.repository';
import { QuoteAdminController } from './presentation/controllers/quote.admin.controller';
import { QuotePublicController } from './presentation/controllers/quote.public.controller';
import { QuoteCommandHandlers } from './application/commands';
import { QuoteQueryHandlers } from './application/queries';
import { QuoteEventHandlers } from './application/events';
import { SharedModule } from '@shared/shared.module';
import { QuotePresenter } from './presentation/presenters/quote.presenter';

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [QuoteAdminController, QuotePublicController],
  providers: [
    {
      provide: QuoteRepository,
      useClass: PrismaQuoteRepository,
    },
    {
      provide: 'QuoteRepository',
      useClass: PrismaQuoteRepository,
    },
    QuoteMapper,
    QuotePresenter,
    ...QuoteCommandHandlers,
    ...QuoteQueryHandlers,
    ...QuoteEventHandlers,
  ],
  exports: [QuoteRepository, 'QuoteRepository'],
})
export class QuoteModule {}
