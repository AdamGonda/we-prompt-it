/*
  Warnings:

  - You are about to drop the column `createdAtOfferStatus` on the `Claim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "createdAtOfferStatus",
ADD COLUMN     "createdAtStage" "InteractionStage" NOT NULL DEFAULT 'STARTED';
