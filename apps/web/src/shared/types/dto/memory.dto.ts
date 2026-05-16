import type { MoodType } from '@forge/reflection';

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



