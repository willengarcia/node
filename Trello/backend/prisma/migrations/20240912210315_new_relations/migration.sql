/*
  Warnings:

  - You are about to drop the column `storeId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_storeId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "UserStore" ADD COLUMN     "imageName" TEXT;
