// src/shared/utils/paginate.ts
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

export async function paginate<T>(
  modelQuery: Promise<T[]>,
  totalCountQuery: Promise<number>,
  page: number,
  limit: number,
): Promise<PaginatedResult<T>> {
  const [data, total] = await Promise.all([modelQuery, totalCountQuery]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
