export interface JobResult<T = any> {
  status: 'completed' | 'failed' | 'skipped';
  reason?: string;
  data?: T;
  metadata: {
    pattern: string;
    timestamp: string;
    duration?: number;
  };
}
