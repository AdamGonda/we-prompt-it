/*
  Warnings:

  - You are about to drop the `InteractionReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfferReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InteractionReview" DROP CONSTRAINT "InteractionReview_interactionId_fkey";

-- DropForeignKey
ALTER TABLE "InteractionReview" DROP CONSTRAINT "InteractionReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "OfferReview" DROP CONSTRAINT "OfferReview_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OfferReview" DROP CONSTRAINT "OfferReview_userId_fkey";

-- DropTable
DROP TABLE "InteractionReview";

-- DropTable
DROP TABLE "OfferReview";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "reviewText" TEXT NOT NULL DEFAULT '',
    "offerId" INTEGER NOT NULL,
    "interactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
