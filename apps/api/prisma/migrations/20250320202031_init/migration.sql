/*
  Warnings:

  - The values [COMPLETED,CANCELLED] on the enum `DeliveryStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryStatus_new" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'DELIVERED');
ALTER TABLE "Reservation" ALTER COLUMN "deliveryStatus" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "deliveryStatus" TYPE "DeliveryStatus_new" USING ("deliveryStatus"::text::"DeliveryStatus_new");
ALTER TYPE "DeliveryStatus" RENAME TO "DeliveryStatus_old";
ALTER TYPE "DeliveryStatus_new" RENAME TO "DeliveryStatus";
DROP TYPE "DeliveryStatus_old";
ALTER TABLE "Reservation" ALTER COLUMN "deliveryStatus" SET DEFAULT 'NOT_STARTED';
COMMIT;
