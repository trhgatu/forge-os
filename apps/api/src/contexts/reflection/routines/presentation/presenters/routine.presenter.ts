import { Injectable } from '@nestjs/common';
import { Routine } from '../../domain/routine.entity';

@Injectable()
export class RoutinePresenter {
  toResponse(routine: Routine) {
    return {
      id: routine.id.value,
      userId: routine.userId,
      title: routine.title,
      comboXp: routine.comboXp,
      isActive: routine.isActive,
      targetTime: routine.targetTime,
      frequency: routine.frequency,
      steps: routine.steps.map((step) => ({
        habitId: step.habitId,
        title: step.title,
        xpReward: step.xpReward,
        order: step.order,
      })),
      completions: routine.completions.map((c) => c.toISOString()),
      createdAt: routine.createdAt.toISOString(),
      updatedAt: routine.updatedAt.toISOString(),
    };
  }

  toResponseArray(routines: Routine[]) {
    return routines.map((routine) => this.toResponse(routine));
  }
}
