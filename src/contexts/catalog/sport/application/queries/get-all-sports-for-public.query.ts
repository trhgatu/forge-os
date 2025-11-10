import { SportStatus } from '@shared/enums';

export interface GetAllSportsForPublicPayload {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: SportStatus;
}

export class GetAllSportsForPublicQuery {
  constructor(public readonly payload: GetAllSportsForPublicPayload) {}
}
