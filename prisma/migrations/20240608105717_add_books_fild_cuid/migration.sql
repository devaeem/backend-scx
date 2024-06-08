/*
  Warnings:

  - A unique constraint covering the columns `[scid]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - The required column `scid` was added to the `books` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "scid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_scid_key" ON "books"("scid");
