import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaQuoteRepository } from './infrastructure/repositories/prisma-quote.repository';
import { QuoteMapper } from './infrastructure/repositories/quote.mapper';
import { QuoteRepository } from './application/ports/quote.repository';
import { QuoteAdminController } from './presentation/controllers/quote.admin.controller';
import { QuotePublicController } from './presentation/controllers/quote.public.controller';
import { QuoteHandlers } from './application/handlers';
import { SharedModule } from '@shared/shared.module';

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
    ...QuoteHandlers,
  ],
  exports: [QuoteRepository],
})
export class QuoteModule {}
