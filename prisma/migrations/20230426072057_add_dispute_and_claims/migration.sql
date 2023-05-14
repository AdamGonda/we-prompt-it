-- CreateTable
CREATE TABLE "Dispute" (
    "id" SERIAL NOT NULL,
    "interactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "pickupClaimId" INTEGER,
    "handoffClaimId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupClaim" (
    "id" SERIAL NOT NULL,
    "interactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PickupClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HandoffClaim" (
    "id" SERIAL NOT NULL,
    "interactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "disputeId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HandoffClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_pickupClaimId_key" ON "Dispute"("pickupClaimId");

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_handoffClaimId_key" ON "Dispute"("handoffClaimId");

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_pickupClaimId_fkey" FOREIGN KEY ("pickupClaimId") REFERENCES "PickupClaim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_handoffClaimId_fkey" FOREIGN KEY ("handoffClaimId") REFERENCES "HandoffClaim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupClaim" ADD CONSTRAINT "PickupClaim_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupClaim" ADD CONSTRAINT "PickupClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HandoffClaim" ADD CONSTRAINT "HandoffClaim_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HandoffClaim" ADD CONSTRAINT "HandoffClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
