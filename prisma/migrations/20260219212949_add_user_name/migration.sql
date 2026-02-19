/*
  Warnings:

  - You are about to drop the column `comments` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "comments",
DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "name" TEXT;
