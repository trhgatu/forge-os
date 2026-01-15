import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { Journal, JournalSchema } from './infrastructure/journal.schema';
import { MongoJournalRepository } from './infrastructure/repositories/mongo-journal.repository';

import { JournalAdminController } from './presentation/controllers/journal.admin.controller';
import { JournalPublicController } from './presentation/controllers/journal.public.controller';

import { SharedModule } from '@shared/shared.module';

import { JournalHandlers } from './application/handlers';
import { JournalRepository } from './application/ports/journal.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Journal.name,
        schema: JournalSchema,
      },
    ]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [JournalAdminController, JournalPublicController],
  providers: [
    {
      provide: JournalRepository,
      useClass: MongoJournalRepository,
    },
    MongoJournalRepository,
    ...JournalHandlers,
  ],
  exports: [],
})
export class JournalModule {}
