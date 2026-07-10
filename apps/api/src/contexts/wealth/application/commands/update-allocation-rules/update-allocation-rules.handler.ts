import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateAllocationRulesCommand } from './update-allocation-rules.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { AutoAllocationRule } from '../../../domain/entities/auto-allocation-rule.entity';
import { AccountId } from '../../../domain/value-objects/account-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(UpdateAllocationRulesCommand)
export class UpdateAllocationRulesHandler implements ICommandHandler<
  UpdateAllocationRulesCommand,
  AutoAllocationRule[]
> {
  constructor(
    private readonly wealthRepo: WealthRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: UpdateAllocationRulesCommand): Promise<AutoAllocationRule[]> {
    const { payload } = command;
    const sourceAccId = AccountId.fromString(payload.sourceAccountId);
    const sourceAcc = await this.wealthRepo.findAccountById(sourceAccId, payload.userId);

    if (!sourceAcc) {
      throw new NotFoundException('Không tìm thấy tài khoản nguồn.');
    }

    const totalPercent = payload.rules.reduce((acc, curr) => acc + curr.percentage, 0);
    if (totalPercent > 100) {
      throw new BadRequestException('Tổng tỷ lệ phân bổ không được vượt quá 100%.');
    }
    if (totalPercent < 0) {
      throw new BadRequestException('Tổng tỷ lệ phân bổ không được nhỏ hơn 0%.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Xóa các rules cũ
      await tx.autoAllocationRule.deleteMany({
        where: { userId: payload.userId, sourceAccountId: payload.sourceAccountId },
      });

      // Tạo các rules mới
      const newRulesData = await Promise.all(
        payload.rules.map((rule) =>
          tx.autoAllocationRule.create({
            data: {
              userId: payload.userId,
              sourceAccountId: payload.sourceAccountId,
              targetAccountId: rule.targetAccountId,
              percentage: rule.percentage,
            },
          }),
        ),
      );

      return newRulesData.map((doc) =>
        AutoAllocationRule.createFromPersistence(
          {
            userId: doc.userId,
            sourceAccountId: doc.sourceAccountId,
            targetAccountId: doc.targetAccountId,
            percentage: Number(doc.percentage),
            isActive: doc.isActive,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          },
          doc.id,
        ),
      );
    });
  }
}
