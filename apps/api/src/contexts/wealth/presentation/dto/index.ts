import { ApiProperty } from '@nestjs/swagger';
import { AssetType, ExpenseCategoryType } from '@prisma/client';
import { IsString, IsNumber, IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: AssetType })
  @IsEnum(AssetType)
  type!: AssetType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string;
}

export class UpdateAccountDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ enum: AssetType, required: false })
  @IsOptional()
  @IsEnum(AssetType)
  type?: AssetType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  balance?: number;
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  accountId!: string;

  @ApiProperty({ enum: ['INCOME', 'EXPENSE', 'TRANSFER'] })
  @IsEnum(['INCOME', 'EXPENSE', 'TRANSFER'])
  type!: 'INCOME' | 'EXPENSE' | 'TRANSFER';

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsString()
  category!: string;

  @ApiProperty({ enum: ExpenseCategoryType })
  @IsEnum(ExpenseCategoryType)
  categoryType!: ExpenseCategoryType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reflection?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isApprovedByWill?: boolean;
}

export class CreateOrUpdateBudgetDto {
  @ApiProperty({ enum: ExpenseCategoryType })
  @IsEnum(ExpenseCategoryType)
  categoryType!: ExpenseCategoryType;

  @ApiProperty()
  @IsNumber()
  limitAmount!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  period?: string;

  @ApiProperty()
  @IsString()
  startDate!: string;

  @ApiProperty()
  @IsString()
  endDate!: string;
}

export class CreateRecurringTransactionDto {
  @ApiProperty()
  @IsString()
  accountId!: string;

  @ApiProperty({ enum: ['INCOME', 'EXPENSE'] })
  @IsEnum(['INCOME', 'EXPENSE'])
  type!: 'INCOME' | 'EXPENSE';

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsString()
  category!: string;

  @ApiProperty({ enum: ExpenseCategoryType })
  @IsEnum(ExpenseCategoryType)
  categoryType!: ExpenseCategoryType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  dayOfMonth!: number;
}

export class UpdateRecurringTransactionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  accountId?: string;

  @ApiProperty({ enum: ['INCOME', 'EXPENSE'], required: false })
  @IsOptional()
  @IsEnum(['INCOME', 'EXPENSE'])
  type?: 'INCOME' | 'EXPENSE';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ enum: ExpenseCategoryType, required: false })
  @IsOptional()
  @IsEnum(ExpenseCategoryType)
  categoryType?: ExpenseCategoryType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  dayOfMonth?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  isActive?: boolean;
}

export class UpdateAllocationRuleItem {
  @ApiProperty()
  @IsString()
  targetAccountId!: string;

  @ApiProperty()
  @IsNumber()
  percentage!: number;
}

export class UpdateAllocationRulesDto {
  @ApiProperty()
  @IsString()
  sourceAccountId!: string;

  @ApiProperty({ type: [UpdateAllocationRuleItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAllocationRuleItem)
  rules!: UpdateAllocationRuleItem[];
}
