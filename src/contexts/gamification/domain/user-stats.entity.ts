import { AggregateRoot } from '@nestjs/cqrs';

export class UserStats extends AggregateRoot {
  constructor(
    public readonly userId: string,
    public xp: number,
    public level: number,
    public title: string,
    public streak: number,
    public lastActivityDate: Date,
    public achievements: string[],
  ) {
    super();
  }

  addXp(amount: number): void {
    this.xp += amount;
    this.checkLevelUp();
  }

  private checkLevelUp(): void {
    // Simple leveling formula: Level = floor(sqrt(XP / 100))
    // Or constant scaling: Level * 1000 XP
    // Usage: Level 1 (0-999), Level 2 (1000-1999)

    // Let's use a non-linear curve: XP = Level^2 * 100
    // Level = sqrt(XP / 100)
    const newLevel = Math.floor(Math.sqrt(this.xp / 100)) + 1;

    if (newLevel > this.level) {
      this.level = newLevel;
      // TODO: Emit LevelUpEvent
      // this.apply(new LevelUpEvent(this.userId, this.level));
    }
  }

  updateStreak(): void {
    const now = new Date();
    const last = new Date(this.lastActivityDate);

    // Normalize to midnight for calendar day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDay = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate(),
    );

    // Check if same day
    if (today.getTime() === lastDay.getTime()) {
      return;
    }

    // Check if consecutive day (difference is exactly 1 day or within safe threshold)
    const diffTime = Math.abs(today.getTime() - lastDay.getTime());
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      this.streak += 1;
    } else {
      this.streak = 1;
    }
    this.lastActivityDate = now;
  }
}
