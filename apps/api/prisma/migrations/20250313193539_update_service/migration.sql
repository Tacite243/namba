/*
  Warnings:

  - Added the required column `image` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unit" TEXT NOT NULL;
