/*
  Warnings:

  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewText` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "rating",
DROP COLUMN "reviewText",
ADD COLUMN     "interactionComment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "interactionRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "offerComment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "offerRating" INTEGER NOT NULL DEFAULT 0;
