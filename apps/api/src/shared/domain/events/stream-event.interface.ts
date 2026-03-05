export interface StreamEventPayload<T = unknown> {
  pattern: string;
  userId: string | { value: string };
  payload: T;
  timestamp?: number;
}
