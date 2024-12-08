-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "is_menu_peanut" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "is_res_peanut" BOOLEAN NOT NULL DEFAULT false;
