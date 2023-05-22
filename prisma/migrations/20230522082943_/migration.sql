/*
  Warnings:

  - You are about to drop the column `aIModelId` on the `Prompt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_aIModelId_fkey";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "aIModelId",
ADD COLUMN     "aiModelId" INTEGER;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_aiModelId_fkey" FOREIGN KEY ("aiModelId") REFERENCES "AIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
