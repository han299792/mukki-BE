-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "is_menu_halal" SET DEFAULT false,
ALTER COLUMN "is_menu_vegan" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Restaurants" ALTER COLUMN "is_res_halal" SET DEFAULT false,
ALTER COLUMN "is_res_vegan" SET DEFAULT false;
