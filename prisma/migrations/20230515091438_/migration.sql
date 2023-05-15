/*
  Warnings:

  - Added the required column `content` to the `ChangeRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChangeRequest" ADD COLUMN     "content" TEXT NOT NULL;
