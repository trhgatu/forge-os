export interface SportResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  status: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
