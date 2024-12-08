/*
  Warnings:

  - You are about to drop the column `religon` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `vegan` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Restaurants` table. All the data in the column will be lost.
  - Added the required column `is_menu_halal` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_menu_vegan` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_res_halal` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_res_vegan` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "religon",
DROP COLUMN "vegan",
ADD COLUMN     "is_menu_halal" BOOLEAN NOT NULL,
ADD COLUMN     "is_menu_vegan" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Restaurants" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "is_res_halal" BOOLEAN NOT NULL,
ADD COLUMN     "is_res_vegan" BOOLEAN NOT NULL;
