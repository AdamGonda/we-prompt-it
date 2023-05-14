/*
  Warnings:

  - You are about to drop the column `handoffClaimId` on the `Dispute` table. All the data in the column will be lost.
  - You are about to drop the column `pickupClaimId` on the `Dispute` table. All the data in the column will be lost.
  - You are about to drop the `HandoffClaim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PickupClaim` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[claimId]` on the table `Dispute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ClaimType" AS ENUM ('PICKUP', 'HANDOFF');

-- DropForeignKey
ALTER TABLE "Dispute" DROP CONSTRAINT "Dispute_handoffClaimId_fkey";

-- DropForeignKey
ALTER TABLE "Dispute" DROP CONSTRAINT "Dispute_pickupClaimId_fkey";

-- DropForeignKey
ALTER TABLE "HandoffClaim" DROP CONSTRAINT "HandoffClaim_interactionId_fkey";

-- DropForeignKey
ALTER TABLE "HandoffClaim" DROP CONSTRAINT "HandoffClaim_userId_fkey";

-- DropForeignKey
ALTER TABLE "PickupClaim" DROP CONSTRAINT "PickupClaim_interactionId_fkey";

-- DropForeignKey
ALTER TABLE "PickupClaim" DROP CONSTRAINT "PickupClaim_userId_fkey";

-- DropIndex
DROP INDEX "Dispute_handoffClaimId_key";

-- DropIndex
DROP INDEX "Dispute_pickupClaimId_key";

-- AlterTable
ALTER TABLE "Dispute" DROP COLUMN "handoffClaimId",
DROP COLUMN "pickupClaimId",
ADD COLUMN     "claimId" INTEGER;

-- DropTable
DROP TABLE "HandoffClaim";

-- DropTable
DROP TABLE "PickupClaim";

-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "interactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "type" "ClaimType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_claimId_key" ON "Dispute"("claimId");

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
