/*
  Warnings:

  - You are about to drop the column `availabilityDuration` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "availabilityDuration",
ADD COLUMN     "maxLendDuration" INTEGER NOT NULL DEFAULT 0;
