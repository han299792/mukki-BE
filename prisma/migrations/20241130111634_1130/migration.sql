/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_item_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_food_preferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu_attributes" DROP CONSTRAINT "menu_attributes_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_item_attributes" DROP CONSTRAINT "menu_item_attributes_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_item_attributes" DROP CONSTRAINT "menu_item_attributes_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_items" DROP CONSTRAINT "menu_items_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "user_food_preferences" DROP CONSTRAINT "user_food_preferences_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "user_food_preferences" DROP CONSTRAINT "user_food_preferences_user_id_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "menu_attributes";

-- DropTable
DROP TABLE "menu_item_attributes";

-- DropTable
DROP TABLE "menu_items";

-- DropTable
DROP TABLE "restaurants";

-- DropTable
DROP TABLE "user_food_preferences";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Restaurants" (
    "restaurant_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "food_category" VARCHAR(50) NOT NULL,
    "contact_number" VARCHAR(15) NOT NULL,
    "address_si" VARCHAR(50) NOT NULL,
    "address_gu" VARCHAR(50) NOT NULL,
    "address_dong" VARCHAR(50) NOT NULL,
    "address_detail" VARCHAR(50) NOT NULL,
    "time_open" TIMESTAMP(3) NOT NULL,
    "time_close" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "menu_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "photo_id" INTEGER,
    "price" DECIMAL(10,2) NOT NULL,
    "religon" VARCHAR(100) NOT NULL,
    "vegan" VARCHAR(100) NOT NULL,
    "allergies_id" CHAR(10) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("menu_id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "photo_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" BYTEA NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "Menu_Component" (
    "menu_com_id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,

    CONSTRAINT "Menu_Component_pkey" PRIMARY KEY ("menu_com_id")
);

-- CreateTable
CREATE TABLE "Components" (
    "component_id" SERIAL NOT NULL,
    "component" VARCHAR(100) NOT NULL,

    CONSTRAINT "Components_pkey" PRIMARY KEY ("component_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "location_lat" DECIMAL(9,6) NOT NULL,
    "location_long" DECIMAL(9,6) NOT NULL,
    "kakaoId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "Menu_restaurant_id_idx" ON "Menu"("restaurant_id");

-- CreateIndex
CREATE INDEX "Menu_Component_menu_id_idx" ON "Menu_Component"("menu_id");

-- CreateIndex
CREATE INDEX "Menu_Component_component_id_idx" ON "Menu_Component"("component_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_kakaoId_key" ON "User"("kakaoId");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurants"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photo"("photo_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Component" ADD CONSTRAINT "Menu_Component_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("menu_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Component" ADD CONSTRAINT "Menu_Component_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Components"("component_id") ON DELETE RESTRICT ON UPDATE CASCADE;
