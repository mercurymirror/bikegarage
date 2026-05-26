/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropTable
DROP TABLE "Task";

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wearLimitKm" INTEGER NOT NULL,

    CONSTRAINT "ComponentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "componentTypeId" TEXT NOT NULL,
    "installedAtKm" INTEGER NOT NULL,
    "replacedAt" TIMESTAMP(3),

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "distanceKm" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ComponentType_name_key" ON "ComponentType"("name");

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_componentTypeId_fkey" FOREIGN KEY ("componentTypeId") REFERENCES "ComponentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
