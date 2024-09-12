/*
  Warnings:

  - You are about to drop the column `imageName` on the `UserStore` table. All the data in the column will be lost.
  - Made the column `userId` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `storeId` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "storeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserStore" DROP COLUMN "imageName";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
