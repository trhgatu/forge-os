import { AggregateRoot } from '@shared/domain/aggregate-root.base';
import { AllocationRuleId } from '../value-objects/allocation-rule-id.vo';

export interface AutoAllocationRuleProps {
  userId: string;
  sourceAccountId: string;
  targetAccountId: string;
  percentage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class AutoAllocationRule extends AggregateRoot<AllocationRuleId> {
  private constructor(
    id: AllocationRuleId,
    private props: AutoAllocationRuleProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<AutoAllocationRuleProps, 'createdAt' | 'updatedAt' | 'isActive'> & {
      isActive?: boolean;
    },
    id?: AllocationRuleId,
  ): AutoAllocationRule {
    const now = new Date();
    return new AutoAllocationRule(id ?? AllocationRuleId.create(), {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(props: AutoAllocationRuleProps, id: string): AutoAllocationRule {
    return new AutoAllocationRule(AllocationRuleId.fromString(id), props);
  }

  get userId() {
    return this.props.userId;
  }
  get sourceAccountId() {
    return this.props.sourceAccountId;
  }
  get targetAccountId() {
    return this.props.targetAccountId;
  }
  get percentage() {
    return this.props.percentage;
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
