/*
  Warnings:

  - You are about to drop the column `initiatedByUserId` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_initiatedByUserId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "initiatedByUserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
