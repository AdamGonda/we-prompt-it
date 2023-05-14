/*
  Warnings:

  - You are about to drop the column `availableFor` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `charge` on the `Resource` table. All the data in the column will be lost.
  - You are about to alter the column `monetaryValue` on the `Resource` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "availableFor",
DROP COLUMN "charge",
ADD COLUMN     "availabilityDuration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "utilizationCost" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "monetaryValue" SET DEFAULT 0,
ALTER COLUMN "monetaryValue" SET DATA TYPE INTEGER;
