export interface TaskBoardResponse {
  todo: Array<{
    id: string;
    title: string;
    priority: PriorityLevel;
  }>;
  inProgress: Array<{
    id: string;
    title: string;
    priority: PriorityLevel;
  }>;
  done: Array<{
    id: string;
    title: string;
    priority: PriorityLevel;
  }>;
}

type PriorityLevel = 'low' | 'medium' | 'high';
