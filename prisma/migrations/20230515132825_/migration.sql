/*
  Warnings:

  - A unique constraint covering the columns `[userId,repoId]` on the table `Star` will be added. If there are existing duplicate values, this will fail.
  - Made the column `repoId` on table `Star` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_repoId_fkey";

-- AlterTable
ALTER TABLE "Star" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "repoId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Star_userId_repoId_key" ON "Star"("userId", "repoId");

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
