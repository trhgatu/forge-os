import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteTransactionCommand } from './delete-transaction.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { TransactionId } from '../../../domain/value-objects/transaction-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(DeleteTransactionCommand)
export class DeleteTransactionHandler implements ICommandHandler<
  DeleteTransactionCommand,
  { success: boolean }
> {
  constructor(
    private readonly wealthRepo: WealthRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: DeleteTransactionCommand): Promise<{ success: boolean }> {
    const txId = TransactionId.fromString(command.id);
    const txRecord = await this.wealthRepo.findTransactionById(txId, command.userId);

    if (!txRecord) {
      throw new NotFoundException('Không tìm thấy giao dịch tài chính.');
    }

    // Hoàn tác số dư tài khoản khi xóa giao dịch
    await this.prisma.$transaction(async (tx) => {
      let balanceChange = 0;
      const amountNum = Number(txRecord.amount);

      if (txRecord.type === 'INCOME') {
        balanceChange = -amountNum; // Trừ lại tiền thu nhập
      } else if (txRecord.type === 'EXPENSE') {
        balanceChange = amountNum; // Cộng lại tiền đã chi tiêu
      }

      if (balanceChange !== 0) {
        await tx.financialAccount.update({
          where: { id: txRecord.accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }

      await tx.financialTransaction.delete({
        where: { id: txRecord.id.value },
      });
    });

    return { success: true };
  }
}
