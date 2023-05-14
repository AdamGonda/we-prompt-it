/*
  Warnings:

  - The values [FINISHED] on the enum `InteractionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InteractionStatus_new" AS ENUM ('STARTED', 'FULFILL', 'REVIEW', 'ENDED');
ALTER TABLE "Interaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Interaction" ALTER COLUMN "status" TYPE "InteractionStatus_new" USING ("status"::text::"InteractionStatus_new");
ALTER TYPE "InteractionStatus" RENAME TO "InteractionStatus_old";
ALTER TYPE "InteractionStatus_new" RENAME TO "InteractionStatus";
DROP TYPE "InteractionStatus_old";
ALTER TABLE "Interaction" ALTER COLUMN "status" SET DEFAULT 'STARTED';
COMMIT;
