export class GoalPresenter {
  static toResponse(goal: any) {
    return {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      xpReward: goal.xpReward,
      badgeIcon: goal.badgeIcon,
      isActive: goal.isActive,
      ...(goal.isCompleted !== undefined && { isCompleted: goal.isCompleted }),
      ...(goal.completedAt !== undefined && { completedAt: goal.completedAt }),
      objectives: goal.objectives.map((obj: any) => ({
        id: obj.id,
        type: obj.type,
        targetCount: obj.targetCount,
        referenceId: obj.referenceId,
        ...(obj.currentCount !== undefined && { currentCount: obj.currentCount }),
        ...(obj.isCompleted !== undefined && { isCompleted: obj.isCompleted }),
      })),
      createdAt: goal.createdAt ? new Date(goal.createdAt).toISOString() : undefined,
      updatedAt: goal.updatedAt ? new Date(goal.updatedAt).toISOString() : undefined,
    };
  }

  static toResponseArray(goals: any[]) {
    return goals.map((goal) => this.toResponse(goal));
  }
}
