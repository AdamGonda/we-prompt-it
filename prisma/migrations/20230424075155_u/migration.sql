/*
  Warnings:

  - You are about to drop the column `maxLendDuration` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "maxLendDuration",
ADD COLUMN     "maxLendInterval" INTEGER NOT NULL DEFAULT 0;
