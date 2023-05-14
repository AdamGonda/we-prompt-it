/*
  Warnings:

  - You are about to drop the column `lendInterval` on the `Resource` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceLendIntervalUnit" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "lendInterval",
ADD COLUMN     "lendIntervalUnit" "ResourceLendIntervalUnit" NOT NULL DEFAULT 'DAY';

-- DropEnum
DROP TYPE "ResourceLendInterval";
