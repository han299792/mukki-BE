/*
  Warnings:

  - You are about to drop the column `allergies_id` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the `Components` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu_Component` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu_Component" DROP CONSTRAINT "Menu_Component_component_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Component" DROP CONSTRAINT "Menu_Component_menu_id_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "allergies_id";

-- DropTable
DROP TABLE "Components";

-- DropTable
DROP TABLE "Menu_Component";
