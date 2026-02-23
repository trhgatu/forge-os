export class MoodResponse {
  id!: string;
  mood!: string;
  note?: string;
  tags!: string[];
  loggedAt!: string;
  createdAt!: string;
  updatedAt!: string;
  isDeleted!: boolean;
  deletedAt?: string;
}
