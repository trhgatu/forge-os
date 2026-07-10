import { AggregateRoot } from '@shared/domain/aggregate-root.base';
import { RecurringTransactionId } from '../value-objects/recurring-transaction-id.vo';
import { ExpenseCategoryType } from '@prisma/client';

export interface RecurringTransactionProps {
  userId: string;
  accountId: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  categoryType: ExpenseCategoryType;
  description?: string;
  dayOfMonth: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class RecurringTransaction extends AggregateRoot<RecurringTransactionId> {
  private constructor(
    id: RecurringTransactionId,
    private props: RecurringTransactionProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<RecurringTransactionProps, 'createdAt' | 'updatedAt' | 'isActive'> & {
      isActive?: boolean;
    },
    id?: RecurringTransactionId,
  ): RecurringTransaction {
    const now = new Date();
    return new RecurringTransaction(id ?? RecurringTransactionId.create(), {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(props: RecurringTransactionProps, id: string): RecurringTransaction {
    return new RecurringTransaction(RecurringTransactionId.fromString(id), props);
  }

  public update(props: {
    accountId?: string;
    type?: 'INCOME' | 'EXPENSE';
    amount?: number;
    category?: string;
    categoryType?: ExpenseCategoryType;
    description?: string;
    dayOfMonth?: number;
    isActive?: boolean;
  }): void {
    if (props.accountId !== undefined) this.props.accountId = props.accountId;
    if (props.type !== undefined) this.props.type = props.type;
    if (props.amount !== undefined) this.props.amount = props.amount;
    if (props.category !== undefined) this.props.category = props.category;
    if (props.categoryType !== undefined) this.props.categoryType = props.categoryType;
    if (props.description !== undefined) this.props.description = props.description;
    if (props.dayOfMonth !== undefined) this.props.dayOfMonth = props.dayOfMonth;
    if (props.isActive !== undefined) this.props.isActive = props.isActive;
    this.props.updatedAt = new Date();
  }

  get userId() {
    return this.props.userId;
  }
  get accountId() {
    return this.props.accountId;
  }
  get type() {
    return this.props.type;
  }
  get amount() {
    return this.props.amount;
  }
  get category() {
    return this.props.category;
  }
  get categoryType() {
    return this.props.categoryType;
  }
  get description() {
    return this.props.description;
  }
  get dayOfMonth() {
    return this.props.dayOfMonth;
  }
  get isActive() {
    return this.props.isActive;
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
