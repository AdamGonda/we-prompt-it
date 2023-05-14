/*
  Warnings:

  - You are about to drop the column `status` on the `Interaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "status",
ADD COLUMN     "stage" "InteractionStage" NOT NULL DEFAULT 'STARTED';
