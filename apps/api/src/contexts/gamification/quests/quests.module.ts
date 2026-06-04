import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { JournalModule } from '../../reflection/journal/journal.module';
import { QuestController } from './presentation/controllers/quest.controller';
import { QuestAdminController } from './presentation/controllers/quest.admin.controller';
import { QuestsRepository } from './domain/quests.repository';
import { PrismaQuestsRepository } from './infrastructure/prisma-quests.repository';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { HabitCompletedQuestHandler } from './application/events/handlers/habit-completed.handler';
import { JournalCreatedQuestHandler } from './application/events/handlers/journal-created.handler';
import { QuestsInitializer } from './infrastructure/quests-initializer.service';
import { GamificationModule } from '../gamification.module';
import { GoalsModule } from '../goals/goals.module';

const EventHandlers = [HabitCompletedQuestHandler, JournalCreatedQuestHandler];

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    SharedModule,
    AuthModule,
    JournalModule,
    GamificationModule,
    GoalsModule,
  ],
  controllers: [QuestController, QuestAdminController],
  providers: [
    {
      provide: QuestsRepository,
      useClass: PrismaQuestsRepository,
    },
    QuestsInitializer,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [QuestsRepository],
})
export class QuestsModule {}
