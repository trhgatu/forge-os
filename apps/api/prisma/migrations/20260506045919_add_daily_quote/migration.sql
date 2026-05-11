-- CreateTable
CREATE TABLE "daily_quotes" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_quotes_date_key" ON "daily_quotes"("date");

-- AddForeignKey
ALTER TABLE "daily_quotes" ADD CONSTRAINT "daily_quotes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
