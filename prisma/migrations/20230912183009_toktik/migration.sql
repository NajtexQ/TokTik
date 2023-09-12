/*
  Warnings:

  - Added the required column `hashtag` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "hashtag" TEXT NOT NULL,
ALTER COLUMN "desc" DROP NOT NULL;
