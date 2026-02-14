/*
  Warnings:

  - You are about to drop the `lessonProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loginHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lessonProgress" DROP CONSTRAINT "lessonProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "loginHistory" DROP CONSTRAINT "loginHistory_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "lessonProgress";

-- DropTable
DROP TABLE "loginHistory";
