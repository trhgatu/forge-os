export interface LogEntry {
  id: string;
  content: string;
  date: Date;
  type: string;
}

export interface PaginatedLogsResponse {
  data: LogEntry[];
  total: number;
  page: number;
  limit: number;
}
