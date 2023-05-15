/*
  Warnings:

  - You are about to drop the column `title` on the `Repo` table. All the data in the column will be lost.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Repo" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';
