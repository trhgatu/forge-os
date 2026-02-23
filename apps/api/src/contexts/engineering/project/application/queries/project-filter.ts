export interface ProjectFilter {
  keyword?: string;
  status?: string;
  tags?: string[];
  isDeleted?: boolean;
  isPinned?: boolean;
  page?: number;
  limit?: number;
}
