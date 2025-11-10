export type PaginatedResponse<T> = {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: T[];
};
