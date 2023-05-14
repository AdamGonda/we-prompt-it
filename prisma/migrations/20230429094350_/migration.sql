/*
  Warnings:

  - You are about to drop the column `interactionComment` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `offerComment` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "interactionComment",
DROP COLUMN "offerComment",
ADD COLUMN     "commentOnInteraction" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "commentOnOffer" TEXT NOT NULL DEFAULT '';
