export class GetAllQuestsQuery {
  constructor(
    public readonly type?: string,
    public readonly isActive?: boolean,
  ) {}
}
