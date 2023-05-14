/*
  Warnings:

  - You are about to drop the column `approved` on the `Claim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "approved",
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
