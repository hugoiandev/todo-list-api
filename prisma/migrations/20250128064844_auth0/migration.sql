/*
  Warnings:

  - You are about to drop the column `userId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `auth0Id` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- DropIndex
DROP INDEX "List_userId_key";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "userId",
ADD COLUMN     "auth0Id" TEXT NOT NULL,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "User";
