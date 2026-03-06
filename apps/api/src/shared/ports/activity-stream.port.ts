export const ACTIVITY_STREAM_PORT = 'ACTIVITY_STREAM_PORT';

export interface IActivityStreamPort {
  emit(pattern: string, userId: string, payload: unknown): Promise<string>;
}
