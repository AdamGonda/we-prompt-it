/*
  Warnings:

  - Added the required column `aIModelId` to the `PromptContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PromptContent" ADD COLUMN     "aIModelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AIModel" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AIModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PromptContent" ADD CONSTRAINT "PromptContent_aIModelId_fkey" FOREIGN KEY ("aIModelId") REFERENCES "AIModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
