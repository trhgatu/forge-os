import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalSchema } from './infrastructure/journal.schema';
import { MongoJournalRepository } from './infrastructure/repositories/mongo-journal.repository';
import { JournalAdminController } from './presentation/controllers/journal.admin.controller';
import { JournalPublicController } from './presentation/controllers/journal.public.controller';
import { CommandHandlers, QueryHandlers } from './application/handlers';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Journal',
        schema: JournalSchema,
      },
    ]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [JournalAdminController, JournalPublicController],
  providers: [
    {
      provide: 'JournalRepository',
      useClass: MongoJournalRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class JournalModule {}
