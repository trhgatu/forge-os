import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';

import { JournalAdminController, JournalController } from './presentation/controllers';
import { JournalPresenter } from './presentation/presenters/journal.presenter';
import { JournalCommandHandlers } from './application/commands';
import { JournalQueryHandlers } from './application/queries';
import { JournalEventHandlers } from './application/events';
import { AuthModule } from '../../iam/auth/auth.module';
import { PrismaJournalRepository } from './infrastructure/repositories/prisma-journal.repository';
import { JournalMapper } from './infrastructure/repositories/journal.mapper';
import { JournalRepository } from './domain/journal.repository';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule],
  controllers: [JournalAdminController, JournalController],
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
