import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteSchema, Quote } from './infrastructure/quote.schema';
import { DailyQuoteSchema } from './infrastructure/daily-quote.schema';
import { MongoQuoteRepository } from './infrastructure/repositories/mongo-quote.repository';
import { QuoteRepository } from './application/ports/quote.repository';
import { QuoteAdminController } from './presentation/controllers/quote.admin.controller';
import { QuotePublicController } from './presentation/controllers/quote.public.controller';
import { SharedModule } from '@shared/shared.module';
import { QuoteHandlers } from './application/handlers';
import { DailyQuote } from './infrastructure/daily-quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quote.name,
        schema: QuoteSchema,
      },
      {
        name: DailyQuote.name,
        schema: DailyQuoteSchema,
      },
    ]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [QuoteAdminController, QuotePublicController],
  providers: [
    {
      provide: QuoteRepository,
      useClass: MongoQuoteRepository,
    },
    MongoQuoteRepository,
    ...QuoteHandlers,
  ],
  exports: [],
})
export class QuoteModule {}
