import { Routine } from '../../domain/routine.entity';

export class RoutinePresenter {
  static toResponse(routine: Routine) {
    return {
      id: routine.id,
      userId: routine.userId,
      title: routine.title,
      comboXp: routine.comboXp,
      isActive: routine.isActive,
      steps: routine.steps.map((step) => ({
        habitId: step.habitId,
        title: step.title,
        xpReward: step.xpReward,
        order: step.order,
      })),
      createdAt: routine.createdAt.toISOString(),
      updatedAt: routine.updatedAt.toISOString(),
    };
  }

  static toResponseArray(routines: Routine[]) {
    return routines.map((routine) => this.toResponse(routine));
  }
}
