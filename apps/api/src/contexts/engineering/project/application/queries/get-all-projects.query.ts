export interface GetAllProjectsPayload {
  keyword?: string;
  status?: string;
  tags?: string[];
  isDeleted?: boolean;
  isPinned?: boolean;
  page?: number;
  limit?: number;
}

export class GetAllProjectsQuery {
  constructor(public readonly payload: GetAllProjectsPayload) {}
}
