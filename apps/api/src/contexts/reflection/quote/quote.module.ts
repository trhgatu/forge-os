import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '@shared/shared.module';

import { QuoteAdminController } from './infrastructure/http/controllers/quote-admin.controller';
import { QuotePublicController } from './infrastructure/http/controllers/quote.public.controller';

import { QuoteRepository } from './domain/repositories/quote.repository';
import { PrismaQuoteRepository } from './infrastructure/repositories/prisma-quote.repository';

import { QuoteHandlers } from './application';

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [QuoteAdminController, QuotePublicController],
  providers: [
    {
      provide: QuoteRepository,
      useClass: PrismaQuoteRepository,
    },
    ...QuoteHandlers,
  ],
  exports: [QuoteRepository],
})
export class QuoteModule {}
