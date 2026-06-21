import { AggregateRoot } from '@shared/domain/aggregate-root.base';
import { AccountId } from '../value-objects/account-id.vo';
import { AssetType } from '@prisma/client';

export interface FinancialAccountProps {
  userId: string;
  name: string;
  type: AssetType;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FinancialAccount extends AggregateRoot<AccountId> {
  private constructor(
    id: AccountId,
    private props: FinancialAccountProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<FinancialAccountProps, 'createdAt' | 'updatedAt' | 'balance' | 'currency'> & {
      balance?: number;
      currency?: string;
    },
    id?: AccountId,
  ): FinancialAccount {
    const now = new Date();
    return new FinancialAccount(id ?? AccountId.create(), {
      ...props,
      balance: props.balance ?? 0,
      currency: props.currency ?? 'VND',
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(props: FinancialAccountProps, id: string): FinancialAccount {
    return new FinancialAccount(AccountId.fromString(id), props);
  }

  public update(props: { name?: string; type?: AssetType; balance?: number }): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.type !== undefined) this.props.type = props.type;
    if (props.balance !== undefined) this.props.balance = props.balance;
    this.props.updatedAt = new Date();
  }

  public adjustBalance(amount: number): void {
    this.props.balance += amount;
    this.props.updatedAt = new Date();
  }

  get userId() {
    return this.props.userId;
  }
  get name() {
    return this.props.name;
  }
  get type() {
    return this.props.type;
  }
  get balance() {
    return this.props.balance;
  }
  get currency() {
    return this.props.currency;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      ...this.props,
    };
  }
}
