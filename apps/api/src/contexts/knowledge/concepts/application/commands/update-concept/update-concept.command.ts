export interface UpdateConceptPayload {
  userId: string;
  id: string;
  title?: string;
  content?: string;
  summary?: string;
}

export class UpdateConceptCommand {
  constructor(public readonly payload: UpdateConceptPayload) {}
}
