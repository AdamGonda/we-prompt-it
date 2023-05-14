/*
  Warnings:

  - The `createdAtOfferStatus` column on the `Claim` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Interaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InteractionStage" AS ENUM ('STARTED', 'FULFILL', 'REVIEW', 'ENDED');

-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "createdAtOfferStatus",
ADD COLUMN     "createdAtOfferStatus" "InteractionStage" NOT NULL DEFAULT 'STARTED';

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "status",
ADD COLUMN     "status" "InteractionStage" NOT NULL DEFAULT 'STARTED';

-- DropEnum
DROP TYPE "InteractionStatus";
