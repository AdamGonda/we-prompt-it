/*
  Warnings:

  - You are about to drop the column `isForked` on the `Repo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Repo" DROP COLUMN "isForked",
ADD COLUMN     "noTimesForked" INTEGER NOT NULL DEFAULT 0;
