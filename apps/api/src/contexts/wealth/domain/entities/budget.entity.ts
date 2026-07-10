import { AggregateRoot } from '@shared/domain/aggregate-root.base';
import { BudgetId } from '../value-objects/budget-id.vo';
import { ExpenseCategoryType } from '@prisma/client';

export interface BudgetProps {
  userId: string;
  categoryType: ExpenseCategoryType;
  limitAmount: number;
  spentAmount: number;
  period: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Budget extends AggregateRoot<BudgetId> {
  private constructor(
    id: BudgetId,
    private props: BudgetProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<BudgetProps, 'createdAt' | 'updatedAt' | 'spentAmount'> & {
      spentAmount?: number;
    },
    id?: BudgetId,
  ): Budget {
    const now = new Date();
    return new Budget(id ?? BudgetId.create(), {
      ...props,
      spentAmount: props.spentAmount ?? 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(props: BudgetProps, id: string): Budget {
    return new Budget(BudgetId.fromString(id), props);
  }

  get userId() {
    return this.props.userId;
  }
  get categoryType() {
    return this.props.categoryType;
  }
  get limitAmount() {
    return this.props.limitAmount;
  }
  get spentAmount() {
    return this.props.spentAmount;
  }
  get period() {
    return this.props.period;
  }
  get startDate() {
    return this.props.startDate;
  }
  get endDate() {
    return this.props.endDate;
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
