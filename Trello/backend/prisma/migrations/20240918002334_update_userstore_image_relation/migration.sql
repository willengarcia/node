/*
  Warnings:

  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageName` on the `UserStore` table. All the data in the column will be lost.
  - Added the required column `userStoreId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "userId",
ADD COLUMN     "userStoreId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserStore" DROP COLUMN "imageName";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userStoreId_fkey" FOREIGN KEY ("userStoreId") REFERENCES "UserStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
