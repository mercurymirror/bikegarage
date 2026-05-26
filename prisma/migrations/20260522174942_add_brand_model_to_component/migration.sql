/*
  Warnings:

  - Added the required column `brand` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL;
