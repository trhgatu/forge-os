import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { QuestController } from './presentation/controllers/quest.controller';
import { QuestAdminController } from './presentation/controllers/quest.admin.controller';
import { QuestsRepository } from './domain/quests.repository';
import { PrismaQuestsRepository } from './infrastructure/prisma-quests.repository';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { GamificationEventDispatcher } from './application/events/gamification-event.dispatcher';
import { QuestsInitializer } from './infrastructure/quests-initializer.service';
import { GamificationModule } from '../gamification.module';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule, GamificationModule, GoalsModule],
  controllers: [QuestController, QuestAdminController],
  providers: [
    {
      provide: QuestsRepository,
      useClass: PrismaQuestsRepository,
    },
    QuestsInitializer,
    GamificationEventDispatcher,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [QuestsRepository],
})
export class QuestsModule {}
