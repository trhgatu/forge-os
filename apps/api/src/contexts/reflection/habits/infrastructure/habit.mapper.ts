import { Habit } from '../domain/habit.entity';

export class HabitMapper {
  static toDomain(doc: any): Habit | null {
    if (!doc) return null;

    return Habit.createFromPersistence(
      {
        userId: doc.userId,
        title: doc.title,
        description: doc.description,
        xpReward: doc.xpReward,
        difficulty: doc.difficulty,
        frequency: doc.frequency || {},
        streak: doc.streak,
        maxStreak: doc.maxStreak,
        habitStrength: doc.habitStrength,
        isActive: doc.isActive,
        actionType: doc.actionType,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.id,
    );
  }

  static toPersistence(entity: Habit): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.value,
      userId: props.userId,
      title: props.title,
      description: props.description,
      xpReward: props.xpReward,
      difficulty: props.difficulty,
      frequency: props.frequency || {},
      streak: props.streak,
      maxStreak: props.maxStreak,
      habitStrength: props.habitStrength,
      isActive: props.isActive,
      actionType: props.actionType,
    };
  }
}
