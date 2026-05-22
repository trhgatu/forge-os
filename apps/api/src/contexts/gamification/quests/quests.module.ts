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
import { CreateQuestHandler } from './application/commands/create-quest.command';
import { UpdateQuestHandler } from './application/commands/update-quest.command';
import { DeleteQuestHandler } from './application/commands/delete-quest.command';
import { IncrementObjectiveProgressHandler } from './application/commands/increment-objective-progress.command';
import { GetDailyQuestsHandler } from './application/queries/get-daily-quests.query';
import { GetAllQuestsHandler } from './application/queries/get-all-quests.query';
import { GetQuestByIdHandler } from './application/queries/get-quest-by-id.query';
import { HabitCompletedQuestHandler } from './application/events/handlers/habit-completed.handler';
import { JournalCreatedQuestHandler } from './application/events/handlers/journal-created.handler';
import { QuestsInitializer } from './infrastructure/quests-initializer.service';

const CommandHandlers = [
  CreateQuestHandler,
  UpdateQuestHandler,
  DeleteQuestHandler,
  IncrementObjectiveProgressHandler,
];
const QueryHandlers = [GetDailyQuestsHandler, GetAllQuestsHandler, GetQuestByIdHandler];
const EventHandlers = [HabitCompletedQuestHandler, JournalCreatedQuestHandler];

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule, JournalModule],
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
