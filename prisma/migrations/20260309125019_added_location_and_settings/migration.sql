/*
  Warnings:

  - A unique constraint covering the columns `[number,locationId]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Table_number_key";

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "locationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "restaurantName" TEXT NOT NULL DEFAULT 'Restaurant',
    "taxRate" DECIMAL(5,4) NOT NULL DEFAULT 0.23,
    "deliveryFee" DECIMAL(10,2) NOT NULL DEFAULT 5.00,
    "serviceFee" DECIMAL(10,2) NOT NULL DEFAULT 2.00,
    "freeDeliveryThreshold" DECIMAL(10,2) NOT NULL DEFAULT 50.00,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Location_isActive_idx" ON "Location"("isActive");

-- CreateIndex
CREATE INDEX "Table_locationId_idx" ON "Table"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Table_number_locationId_key" ON "Table"("number", "locationId");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
