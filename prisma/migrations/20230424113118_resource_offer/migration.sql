/*
  Warnings:

  - You are about to drop the column `resourceId` on the `Interaction` table. All the data in the column will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `offerId` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('PUBLISHED', 'ARCHIVED', 'INTERACTION_STARTED');

-- CreateEnum
CREATE TYPE "OfferLendIntervalUnit" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- CreateEnum
CREATE TYPE "OfferCurrency" AS ENUM ('EUR');

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceReview" DROP CONSTRAINT "ResourceReview_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceReview" DROP CONSTRAINT "ResourceReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceToUser" DROP CONSTRAINT "ResourceToUser_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceToUser" DROP CONSTRAINT "ResourceToUser_userId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "resourceId",
ADD COLUMN     "offerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "ResourceReview";

-- DropTable
DROP TABLE "ResourceToUser";

-- DropEnum
DROP TYPE "ResourceCategory";

-- DropEnum
DROP TYPE "ResourceCurrency";

-- DropEnum
DROP TYPE "ResourceLendIntervalUnit";

-- DropEnum
DROP TYPE "ResourceStatus";

-- DropEnum
DROP TYPE "ResourceType";

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "utilizationCost" INTEGER NOT NULL DEFAULT 0,
    "lendIntervalUnit" "OfferLendIntervalUnit" NOT NULL DEFAULT 'DAY',
    "maxLendInterval" INTEGER NOT NULL DEFAULT 0,
    "monetaryValue" INTEGER NOT NULL DEFAULT 0,
    "currency" "OfferCurrency" NOT NULL DEFAULT 'EUR',
    "status" "OfferStatus" NOT NULL DEFAULT 'PUBLISHED',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferReview" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "reviewText" TEXT NOT NULL DEFAULT '',
    "offerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferToUser" (
    "userId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,

    CONSTRAINT "OfferToUser_pkey" PRIMARY KEY ("userId","offerId")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferReview" ADD CONSTRAINT "OfferReview_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferReview" ADD CONSTRAINT "OfferReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferToUser" ADD CONSTRAINT "OfferToUser_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferToUser" ADD CONSTRAINT "OfferToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
