import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { AuthModule } from '@root/contexts/iam/auth/auth.module';
import { VitalityController } from './presentation/controllers/vitality.controller';
import { VitalityPresenter } from './presentation/presenters/vitality.presenter';
import { VitalityRepository } from './domain/vitality.repository';
import { PrismaVitalityRepository } from './infrastructure/repositories/prisma-vitality.repository';
import { VitalityCommandHandlers } from './application/commands';
import { VitalityQueryHandlers } from './application/queries';
import { VitalityEventDispatcher } from './application/listeners/vitality-event.dispatcher';
import { HydrationStrategy } from './application/commands/log-vitality-action/strategies/hydration.strategy';
import { SleepStrategy } from './application/commands/log-vitality-action/strategies/sleep.strategy';
import { CaffeineStrategy } from './application/commands/log-vitality-action/strategies/caffeine.strategy';
import { WorkoutStrategy } from './application/commands/log-vitality-action/strategies/workout.strategy';
import { MaktubAlignStrategy } from './application/commands/log-vitality-action/strategies/maktub-align.strategy';
import { DefaultStrategy } from './application/commands/log-vitality-action/strategies/default.strategy';
import { VitalityStrategyRegistry } from './application/commands/log-vitality-action/strategies/vitality-strategy.registry';
import { BiometricEffectEngine } from './application/listeners/biometric-effect.engine';
import { ConsumeStaminaProcessor } from './application/listeners/processors/consume-stamina.processor';
import { LogVitalityActionProcessor } from './application/listeners/processors/log-vitality-action.processor';

@Module({
  imports: [CqrsModule, PrismaModule, AuthModule],
  controllers: [VitalityController],
  providers: [
    VitalityPresenter,
    {
      provide: VitalityRepository,
      useClass: PrismaVitalityRepository,
    },
    ...VitalityCommandHandlers,
    ...VitalityQueryHandlers,
    VitalityEventDispatcher,
    HydrationStrategy,
    SleepStrategy,
    CaffeineStrategy,
    WorkoutStrategy,
    MaktubAlignStrategy,
    DefaultStrategy,
    VitalityStrategyRegistry,
    BiometricEffectEngine,
    ConsumeStaminaProcessor,
    LogVitalityActionProcessor,
    {
      provide: 'BiometricProcessor',
      useFactory: (p1: ConsumeStaminaProcessor, p2: LogVitalityActionProcessor) => [p1, p2],
      inject: [ConsumeStaminaProcessor, LogVitalityActionProcessor],
    },
  ],
  exports: [VitalityRepository],
})
export class VitalityModule {}
