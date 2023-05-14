/*
  Warnings:

  - You are about to drop the column `userId` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `initiatedByUserId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_userId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "userId",
ADD COLUMN     "initiatedByUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_initiatedByUserId_fkey" FOREIGN KEY ("initiatedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
