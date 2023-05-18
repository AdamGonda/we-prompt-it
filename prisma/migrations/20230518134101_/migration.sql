-- AlterTable
ALTER TABLE "Repo" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
