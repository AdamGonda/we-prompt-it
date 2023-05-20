/*
  Warnings:

  - The `version` column on the `Prompt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "version",
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
