import { ConceptId } from './value-objects/concept-id.vo';
import { KnowledgeSourceType } from '@prisma/client';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { ConceptCreatedEvent } from './events/concept-created.event';
import { ConceptModifiedEvent } from './events/concept-modified.event';

interface ConceptProps {
  userId: string;
  title: string;
  sourceType: KnowledgeSourceType;
  sourceUrl?: string | null;
  content: string;
  summary: string;
  insights: string[];
  reflection?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Concept extends AggregateRoot<ConceptId> {
  private constructor(
    id: ConceptId,
    private props: ConceptProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<ConceptProps, 'createdAt' | 'updatedAt' | 'summary' | 'insights' | 'reflection'> & {
      summary?: string;
      insights?: string[];
      reflection?: string;
    },
    id: ConceptId,
  ): Concept {
    const now = new Date();
    const finalContent = props.content;
    const summary =
      props.summary ||
      (finalContent.length > 200 ? finalContent.substring(0, 200) + '...' : finalContent);

    // Generate automatic metadata if not provided
    const insights = props.insights || Concept.generateAutomaticInsights(props.title, finalContent);
    const reflection = props.reflection || Concept.generateAutomaticReflection(props.title);

    const concept = new Concept(id, {
      ...props,
      summary,
      insights,
      reflection,
      createdAt: now,
      updatedAt: now,
    });

    concept.addDomainEvent(new ConceptCreatedEvent(id.value, props.userId, props.sourceType));
    return concept;
  }

  static createFromPersistence(props: ConceptProps, id: string): Concept {
    return new Concept(ConceptId.fromString(id), props);
  }

  // --- Semantic Domain Methods ---
  public updateContent(data: { title?: string; content?: string; summary?: string }): void {
    if (data.title !== undefined) this.props.title = data.title;
    if (data.content !== undefined) this.props.content = data.content;

    if (data.summary !== undefined) {
      this.props.summary = data.summary;
    } else if (data.content !== undefined) {
      this.props.summary =
        data.content.length > 200 ? data.content.substring(0, 200) + '...' : data.content;
    }

    this.props.updatedAt = new Date();
    this.addDomainEvent(new ConceptModifiedEvent(this.id.value, this.props.userId));
  }

  private static generateAutomaticInsights(title: string, content: string): string[] {
    const sentences = content
      .replace(/<[^>]*>/g, '')
      .split(/[.!?]+?/)
      .map((s) => s.trim())
      .filter((s) => s.length > 30);

    const insights = sentences.slice(0, 3);
    while (insights.length < 3) {
      if (insights.length === 0)
        insights.push(`Tri thức về '${title}' khai mở cho tâm thức những góc nhìn mới.`);
      else if (insights.length === 1)
        insights.push(`Sự tập trung phân tích bài học giúp củng cố liên kết thần kinh.`);
      else
        insights.push(
          `Crystallization (Kết tinh) là giao thức chuyển hóa thông tin thô thành trí tuệ.`,
        );
    }
    return insights;
  }

  private static generateAutomaticReflection(title: string): string {
    const reflectionPrompts = [
      `Khái niệm '${title}' liên kết như thế nào với những trải nghiệm thực tế trong ngày hôm nay của bạn?`,
      `Bài học triết học nào từ '${title}' có thể được áp dụng trực tiếp để củng cố lý trí và ý chí của bạn?`,
      `Nếu phải giải thích '${title}' cho một đứa trẻ, bạn sẽ chọn lọc tinh hoa nào để truyền tải?`,
    ];
    return reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];
  }

  // --- Getters ---
  get userId() {
    return this.props.userId;
  }
  get title() {
    return this.props.title;
  }
  get sourceType() {
    return this.props.sourceType;
  }
  get sourceUrl() {
    return this.props.sourceUrl;
  }
  get content() {
    return this.props.content;
  }
  get summary() {
    return this.props.summary;
  }
  get insights() {
    return this.props.insights;
  }
  get reflection() {
    return this.props.reflection;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  public toPersistence() {
    return {
      id: this.id.value,
      ...this.props,
    };
  }
}
