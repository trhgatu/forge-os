export interface UpdateAllocationRulesPayload {
  userId: string;
  sourceAccountId: string;
  rules: { targetAccountId: string; percentage: number }[];
}

export class UpdateAllocationRulesCommand {
  constructor(public readonly payload: UpdateAllocationRulesPayload) {}
}
