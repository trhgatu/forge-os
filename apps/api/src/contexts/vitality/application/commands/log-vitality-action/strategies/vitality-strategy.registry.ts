import { Injectable } from '@nestjs/common';
import { VitalityActionStrategy } from './vitality-action.strategy';
import { HydrationStrategy } from './hydration.strategy';
import { SleepStrategy } from './sleep.strategy';
import { CaffeineStrategy } from './caffeine.strategy';
import { WorkoutStrategy } from './workout.strategy';
import { MaktubAlignStrategy } from './maktub-align.strategy';
import { DefaultStrategy } from './default.strategy';

@Injectable()
export class VitalityStrategyRegistry {
  private readonly strategies = new Map<string, VitalityActionStrategy>();

  constructor(
    private readonly hydrationStrategy: HydrationStrategy,
    private readonly sleepStrategy: SleepStrategy,
    private readonly caffeineStrategy: CaffeineStrategy,
    private readonly workoutStrategy: WorkoutStrategy,
    private readonly maktubAlignStrategy: MaktubAlignStrategy,
    private readonly defaultStrategy: DefaultStrategy,
  ) {
    this.strategies.set(this.hydrationStrategy.type, this.hydrationStrategy);
    this.strategies.set(this.sleepStrategy.type, this.sleepStrategy);
    this.strategies.set(this.caffeineStrategy.type, this.caffeineStrategy);
    this.strategies.set(this.workoutStrategy.type, this.workoutStrategy);
    this.strategies.set(this.maktubAlignStrategy.type, this.maktubAlignStrategy);
  }

  get(type: string): VitalityActionStrategy {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      return this.defaultStrategy;
    }
    return strategy;
  }
}
