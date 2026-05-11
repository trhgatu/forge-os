/*
  Warnings:

  - You are about to drop the column `metadata` on the `audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `audit_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "metadata",
DROP COLUMN "resource",
ADD COLUMN     "body" JSONB,
ADD COLUMN     "method" TEXT,
ADD COLUMN     "params" JSONB,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "query" JSONB,
ADD COLUMN     "statusCode" INTEGER;
