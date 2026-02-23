// shared/types/api.ts
export type BackendResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: T[];
};
