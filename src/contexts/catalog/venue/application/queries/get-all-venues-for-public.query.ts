import { SportType } from '@shared/enums';

export interface GetAllVenuesForPublicPayload {
  page?: number;
  limit?: number;
  keyword?: string;
  sportType?: SportType;
}

export class GetAllVenuesForPublicQuery {
  constructor(public readonly payload: GetAllVenuesForPublicPayload) {}
}
