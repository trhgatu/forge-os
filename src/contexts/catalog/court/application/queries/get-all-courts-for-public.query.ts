import { SportType } from '@shared/enums';

export interface GetAllCourtsForPublicPayload {
  page?: number;
  limit?: number;
  keyword?: string;
  sportType?: SportType;
}

export class GetAllCourtsForPublicQuery {
  constructor(public readonly payload: GetAllCourtsForPublicPayload) {}
}
