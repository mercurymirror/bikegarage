-- CreateEnum
CREATE TYPE "BikeType" AS ENUM ('ROAD', 'MOUNTAIN', 'GRAVEL', 'ELECTRIC', 'CITY');

-- AlterTable
ALTER TABLE "Bike" ADD COLUMN     "type" "BikeType" NOT NULL DEFAULT 'ROAD';
