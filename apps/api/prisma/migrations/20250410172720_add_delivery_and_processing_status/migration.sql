/*
  Warnings:

  - You are about to drop the column `dirtinessLevel` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedDeliveryTime` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `itemRemarks` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `weightKg` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SelectedItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SelectedItem" DROP CONSTRAINT "SelectedItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "SelectedItem" DROP CONSTRAINT "SelectedItem_reservationId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "dirtinessLevel",
DROP COLUMN "email",
DROP COLUMN "estimatedDeliveryTime",
DROP COLUMN "itemRemarks",
DROP COLUMN "paymentMethod",
DROP COLUMN "totalPrice",
DROP COLUMN "weightKg",
ALTER COLUMN "processingTime" SET DEFAULT 'NORMAL_24H';

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "SelectedItem";

-- DropEnum
DROP TYPE "DirtinessLevel";

-- DropEnum
DROP TYPE "PaymentMethod";
