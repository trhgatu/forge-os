import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '@root/contexts/iam/auth/auth.module';
import { WealthController } from './presentation/controllers/wealth.controller';
import { WealthPresenter } from './presentation/presenters/wealth.presenter';
import { PrismaWealthRepository } from './infrastructure/repositories/prisma-wealth.repository';
import { WealthRepository } from './domain/wealth.repository';
import { WealthCommandHandlers } from './application/commands';
import { WealthQueryHandlers } from './application/queries';
import { RecurringTransactionScheduler } from './infrastructure/schedulers/recurring-transaction.scheduler';

@Module({
  imports: [CqrsModule, PrismaModule, AuthModule],
  controllers: [WealthController],
  providers: [
    WealthPresenter,
    RecurringTransactionScheduler,
    {
      provide: WealthRepository,
      useClass: PrismaWealthRepository,
    },
    ...WealthCommandHandlers,
    ...WealthQueryHandlers,
  ],
  exports: [WealthRepository, RecurringTransactionScheduler],
})
export class WealthModule {}
