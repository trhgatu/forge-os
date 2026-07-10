export interface ReviewCardPayload {
  userId: string;
  cardId: string;
  rating: number;
  responseTimeMs: number;
}

export class ReviewCardCommand {
  constructor(public readonly payload: ReviewCardPayload) {}
}
