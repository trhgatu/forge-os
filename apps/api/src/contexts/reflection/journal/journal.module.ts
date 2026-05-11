import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';

import { JournalAdminController, JournalPublicController } from './presentation/controllers';
import { JournalPresenter } from './presentation/presenters/journal.presenter';
import { JournalCommandHandlers } from './application/commands';
import { JournalQueryHandlers } from './application/queries';
import { JournalEventHandlers } from './application/events';
import { PrismaJournalRepository } from './infrastructure/repositories/prisma-journal.repository';
import { JournalMapper } from './infrastructure/repositories/journal.mapper';
import { JournalRepository } from './domain/journal.repository';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule],
  controllers: [JournalAdminController, JournalPublicController],
  providers: [
    JournalPresenter,
    JournalMapper,
    {
      provide: JournalRepository,
      useClass: PrismaJournalRepository,
    },
    {
      provide: 'JournalRepository',
      useClass: PrismaJournalRepository,
    },
    ...JournalCommandHandlers,
    ...JournalQueryHandlers,
    ...JournalEventHandlers,
  ],
  exports: [JournalRepository, 'JournalRepository'],
})
export class JournalModule {}
