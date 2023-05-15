/*
  Warnings:

  - Made the column `promptId` on table `ChangeRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChangeRequest" DROP CONSTRAINT "ChangeRequest_promptId_fkey";

-- AlterTable
ALTER TABLE "ChangeRequest" ALTER COLUMN "promptId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ChangeRequest" ADD CONSTRAINT "ChangeRequest_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
