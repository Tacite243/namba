/*
  Warnings:

  - Added the required column `dirtinessLevel` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processingTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightKg` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DirtinessLevel" AS ENUM ('LEGER', 'MODERE', 'FORT');

-- CreateEnum
CREATE TYPE "ProcessingTime" AS ENUM ('EXPRESS_4H', 'EXPRESS_8H', 'NORMAL_24H');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'MOBILE_MONEY', 'BANK_TRANSFER');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN     "dirtinessLevel" "DirtinessLevel" NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "estimatedDeliveryTime" TIMESTAMP(3),
ADD COLUMN     "isCurrentLocation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "itemRemarks" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "pickupAddress" TEXT,
ADD COLUMN     "pickupDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickupTime" TEXT NOT NULL,
ADD COLUMN     "processingTime" "ProcessingTime" NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weightKg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "whatsappNumber" TEXT;

-- CreateTable
CREATE TABLE "SelectedItem" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SelectedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- AddForeignKey
ALTER TABLE "SelectedItem" ADD CONSTRAINT "SelectedItem_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedItem" ADD CONSTRAINT "SelectedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
