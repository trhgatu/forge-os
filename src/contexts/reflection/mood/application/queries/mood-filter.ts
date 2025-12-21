export type MoodFilter = {
  page?: number;
  limit?: number;
  tags?: string[];
  mood?: string;
  from?: Date;
  to?: Date;
  isDeleted?: boolean;
};
