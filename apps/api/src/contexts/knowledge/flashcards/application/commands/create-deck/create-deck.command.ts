export interface CreateDeckPayload {
  userId: string;
  title: string;
  description?: string;
  colorTheme?: string;
}

export class CreateDeckCommand {
  constructor(public readonly payload: CreateDeckPayload) {}
}
