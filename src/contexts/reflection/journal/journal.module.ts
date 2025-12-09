import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { JournalSchema } from './infrastructure/journal.schema';
import { MongoJournalRepository } from './infrastructure/repositories/mongo-journal.repository';

import { JournalAdminController } from './presentation/controllers/journal.admin.controller';
import { JournalPublicController } from './presentation/controllers/journal.public.controller';

import { SharedModule } from '@shared/shared.module';

import { JournalHandlers } from './application/handlers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Journal', schema: JournalSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [JournalAdminController, JournalPublicController],
  providers: [
    {
      provide: 'JournalRepository',
      useClass: MongoJournalRepository,
    },
    MongoJournalRepository,
    ...JournalHandlers,
  ],
  exports: [],
})
export class JournalModule {}
