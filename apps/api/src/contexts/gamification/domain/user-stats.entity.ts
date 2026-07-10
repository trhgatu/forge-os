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
    public discipline: number = 0,
    public consistency: number = 0,
    public willpower: number = 0,
    public awareness: number = 0,
    public presence: number = 0,
  ) {
    super();
  }

  addXp(amount: number): void {
    this.xp = Math.max(0, this.xp + amount);
    this.checkLevelUp();
  }

  private checkLevelUp(): void {
    const newLevel = Math.floor(Math.sqrt(this.xp / 100)) + 1;

    if (newLevel > this.level) {
      this.level = newLevel;
    }
  }

  updateStreak(): void {
    const now = new Date();
    const last = new Date(this.lastActivityDate);

    // Normalize to midnight for calendar day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());

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

  addAttributes(props: {
    discipline?: number;
    consistency?: number;
    willpower?: number;
    awareness?: number;
    presence?: number;
  }): void {
    if (props.discipline) this.discipline += props.discipline;
    if (props.consistency) this.consistency += props.consistency;
    if (props.willpower) this.willpower += props.willpower;
    if (props.awareness) this.awareness += props.awareness;
    if (props.presence) this.presence += props.presence;
    this.lastActivityDate = new Date();
  }
}
