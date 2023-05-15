/*
  Warnings:

  - You are about to drop the column `content` on the `ChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `promptId` on the `ChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `promptId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `promptContentId` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `promptId` on the `Star` table. All the data in the column will be lost.
  - You are about to drop the `PromptContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PromptToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChangeRequest" DROP CONSTRAINT "ChangeRequest_promptId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_promptId_fkey";

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_promptContentId_fkey";

-- DropForeignKey
ALTER TABLE "PromptContent" DROP CONSTRAINT "PromptContent_aIModelId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_promptId_fkey";

-- DropForeignKey
ALTER TABLE "_PromptToTag" DROP CONSTRAINT "_PromptToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PromptToTag" DROP CONSTRAINT "_PromptToTag_B_fkey";

-- AlterTable
ALTER TABLE "ChangeRequest" DROP COLUMN "content",
DROP COLUMN "promptId",
ADD COLUMN     "repoId" INTEGER;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
DROP COLUMN "promptId",
ADD COLUMN     "repoId" INTEGER;

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "authorId",
DROP COLUMN "promptContentId",
DROP COLUMN "title",
ADD COLUMN     "aIModelId" INTEGER,
ADD COLUMN     "version" TEXT NOT NULL DEFAULT '0.0.1';

-- AlterTable
ALTER TABLE "Star" DROP COLUMN "promptId",
ADD COLUMN     "repoId" INTEGER;

-- DropTable
DROP TABLE "PromptContent";

-- DropTable
DROP TABLE "_PromptToTag";

-- CreateTable
CREATE TABLE "Repo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "promptId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RepoToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Repo_promptId_key" ON "Repo"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "_RepoToTag_AB_unique" ON "_RepoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RepoToTag_B_index" ON "_RepoToTag"("B");

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_aIModelId_fkey" FOREIGN KEY ("aIModelId") REFERENCES "AIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeRequest" ADD CONSTRAINT "ChangeRequest_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepoToTag" ADD CONSTRAINT "_RepoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RepoToTag" ADD CONSTRAINT "_RepoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
