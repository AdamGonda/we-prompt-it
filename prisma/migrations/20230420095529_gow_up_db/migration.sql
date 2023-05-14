/*
  Warnings:

  - You are about to drop the column `signalId` on the `Interaction` table. All the data in the column will be lost.
  - The `status` column on the `Interaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Signal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SignalToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resourceId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Interaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('OFFER');

-- CreateEnum
CREATE TYPE "ResourceCategory" AS ENUM ('ITEM');

-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ResourceLendInterval" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- CreateEnum
CREATE TYPE "ResourceCurrency" AS ENUM ('EUR');

-- CreateEnum
CREATE TYPE "InteractionStatus" AS ENUM ('STARTED', 'FULFILL', 'REVIEW', 'FINISHED');

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_initiatorId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_signalId_fkey";

-- DropForeignKey
ALTER TABLE "Signal" DROP CONSTRAINT "Signal_userId_fkey";

-- DropForeignKey
ALTER TABLE "SignalToUser" DROP CONSTRAINT "SignalToUser_signalId_fkey";

-- DropForeignKey
ALTER TABLE "SignalToUser" DROP CONSTRAINT "SignalToUser_userId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "signalId",
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "resourceId" INTEGER NOT NULL,
ADD COLUMN     "staredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InteractionStatus" NOT NULL DEFAULT 'STARTED';

-- DropTable
DROP TABLE "Signal";

-- DropTable
DROP TABLE "SignalToUser";

-- DropTable
DROP TABLE "UserInfo";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "picture" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "type" "ResourceType" NOT NULL DEFAULT 'OFFER',
    "category" "ResourceCategory" NOT NULL DEFAULT 'ITEM',
    "charge" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "lendInterval" "ResourceLendInterval" NOT NULL DEFAULT 'DAY',
    "availableFor" INTEGER NOT NULL DEFAULT 0,
    "monetaryValue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" "ResourceCurrency" NOT NULL DEFAULT 'EUR',
    "status" "ResourceStatus" NOT NULL DEFAULT 'PUBLISHED',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceReview" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "reviewText" TEXT NOT NULL DEFAULT '',
    "resourceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResourceReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteractionReview" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "reviewText" TEXT NOT NULL DEFAULT '',
    "interactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InteractionReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceToUser" (
    "userId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "ResourceToUser_pkey" PRIMARY KEY ("userId","resourceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceReview" ADD CONSTRAINT "ResourceReview_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceReview" ADD CONSTRAINT "ResourceReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionReview" ADD CONSTRAINT "InteractionReview_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionReview" ADD CONSTRAINT "InteractionReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceToUser" ADD CONSTRAINT "ResourceToUser_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceToUser" ADD CONSTRAINT "ResourceToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
