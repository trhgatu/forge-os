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

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule, AuthModule],
  controllers: [RoutineController],
  providers: [
    {
      provide: RoutinesRepository,
      useClass: PrismaRoutinesRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [RoutinesRepository],
})
export class RoutinesModule {}
