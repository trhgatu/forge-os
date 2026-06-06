import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../../iam/auth/auth.module';
import { RoutineController } from './presentation/controllers/routine.controller';
import { RoutinesRepository } from './domain/routines.repository';
import { PrismaRoutinesRepository } from './infrastructure/prisma-routines.repository';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { RoutinePresenter } from './presentation/presenters/routine.presenter';

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule],
  controllers: [RoutineController],
  providers: [
    {
      provide: RoutinesRepository,
      useClass: PrismaRoutinesRepository,
    },
    {
      provide: 'RoutinesRepository',
      useClass: PrismaRoutinesRepository,
    },
    RoutinePresenter,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [RoutinesRepository, 'RoutinesRepository'],
})
export class RoutinesModule {}
