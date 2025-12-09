export class JournalResponse {
  id!: string;
  title!: string;
  content!: string;
  mood?: string;
  tags!: string[];
  date!: string;
  createdAt!: string;
  updatedAt!: string;
  isDeleted!: boolean;
  deletedAt?: string;
}
