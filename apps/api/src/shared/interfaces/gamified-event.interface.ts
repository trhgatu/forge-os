export interface GamificationProgress {
  actionType: string;
  amount: number;
  referenceId?: string | null;
}

export interface GamifiedEvent {
  getUserId(): string;
  getGamificationProgresses(): GamificationProgress[];
}
