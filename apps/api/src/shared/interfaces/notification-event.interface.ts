export interface NotificationEvent {
  getUserId(): string;
  getNotificationPayload(): {
    type: string;
    title: string;
    description: string;
    xp?: number;
    metadata?: any;
  };
}
