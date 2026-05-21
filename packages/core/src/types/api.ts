export interface BackendResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
