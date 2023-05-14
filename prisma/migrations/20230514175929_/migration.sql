-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "title" SET DEFAULT '';

-- AlterTable
ALTER TABLE "PromptContent" ALTER COLUMN "version" SET DEFAULT '0.0.1',
ALTER COLUMN "content" SET DEFAULT '';
