import { AggregateRoot } from '@shared/domain/aggregate-root.base';
import { TransactionId } from '../value-objects/transaction-id.vo';
import { ExpenseCategoryType } from '@prisma/client';

export interface FinancialTransactionProps {
  userId: string;
  accountId: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  amount: number;
  category: string;
  categoryType: ExpenseCategoryType;
  description?: string;
  reflection?: string;
  isApprovedByWill: boolean;
  loggedAt: Date;
  createdAt: Date;
}

export class FinancialTransaction extends AggregateRoot<TransactionId> {
  private constructor(
    id: TransactionId,
    private props: FinancialTransactionProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<FinancialTransactionProps, 'createdAt' | 'isApprovedByWill' | 'loggedAt'> & {
      isApprovedByWill?: boolean;
      loggedAt?: Date;
    },
    id?: TransactionId,
  ): FinancialTransaction {
    const now = new Date();
    return new FinancialTransaction(id ?? TransactionId.create(), {
      ...props,
      isApprovedByWill: props.isApprovedByWill ?? true,
      loggedAt: props.loggedAt ?? now,
      createdAt: now,
    });
  }

  static createFromPersistence(props: FinancialTransactionProps, id: string): FinancialTransaction {
    return new FinancialTransaction(TransactionId.fromString(id), props);
  }

  public updateReflection(reflection: string): void {
    this.props.reflection = reflection;
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
  get reflection() {
    return this.props.reflection;
  }
  get isApprovedByWill() {
    return this.props.isApprovedByWill;
  }
  get loggedAt() {
    return this.props.loggedAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      ...this.props,
    };
  }
}
