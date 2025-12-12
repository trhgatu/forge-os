import { MoodType } from "@/shared/types/journal";

export interface MemoryDto {
  id: string;
  title: string;
  content: string;
  mood: MoodType;
  tags: string[];
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
