export class CreateProjectPayload {
  title?: string;
  description?: string;
  userId?: string;
}

export class CreateProjectCommand {
  constructor(public readonly payload: CreateProjectPayload) {}
}
