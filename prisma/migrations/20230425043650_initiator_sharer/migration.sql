/*
  Warnings:

  - You are about to drop the column `initiatorId` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Interaction` table. All the data in the column will be lost.
  - Added the required column `seekerId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sharerId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_initiatorId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_receiverId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "initiatorId",
DROP COLUMN "receiverId",
ADD COLUMN     "seekerId" INTEGER NOT NULL,
ADD COLUMN     "sharerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_sharerId_fkey" FOREIGN KEY ("sharerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
