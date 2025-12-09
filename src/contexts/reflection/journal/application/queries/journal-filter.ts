export type JournalFilter = {
  page?: number;
  limit?: number;
  keyword?: string;
  mood?: string;
  tags?: string[];
  isDeleted?: boolean;
};
