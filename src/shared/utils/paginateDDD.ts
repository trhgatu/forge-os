export async function paginateDDD<T>(
  dataQuery: Promise<T[]>,
  countQuery: Promise<number>,
  page: number,
  limit: number,
) {
  const [data, total] = await Promise.all([dataQuery, countQuery]);

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
}
