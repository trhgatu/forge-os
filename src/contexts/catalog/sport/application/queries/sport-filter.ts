import { SportStatus } from '@shared/enums';

export interface SportFilter {
  keyword?: string;
  status?: SportStatus;
  isDeleted?: boolean;

  page?: number;
  limit?: number;
  skip?: number;
}
