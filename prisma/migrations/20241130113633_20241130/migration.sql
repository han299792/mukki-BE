/*
  Warnings:

  - Added the required column `latitude` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "latitude" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(9,6) NOT NULL;
