/*
  Warnings:

  - You are about to drop the column `resourceId` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `signalId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_resourceId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "resourceId",
ADD COLUMN     "signalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_signalId_fkey" FOREIGN KEY ("signalId") REFERENCES "Signal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
