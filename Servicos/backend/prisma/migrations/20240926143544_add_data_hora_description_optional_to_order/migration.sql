/*
  Warnings:

  - Added the required column `data` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hota` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hota" TEXT NOT NULL;
