/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "restaurants" (
    "restaurant_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "contact_number" VARCHAR(15),

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "menu_item_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_halal" BOOLEAN NOT NULL,
    "is_vegan" BOOLEAN NOT NULL,
    "contains_allergens" VARCHAR(255),

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("menu_item_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "kakaoId" INTEGER,
    "location_lat" DECIMAL(9,6),
    "location_long" DECIMAL(9,6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_food_preferences" (
    "user_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,

    CONSTRAINT "user_food_preferences_pkey" PRIMARY KEY ("user_id","attribute_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "menu_attributes" (
    "attribute_id" SERIAL NOT NULL,
    "attribute_name" VARCHAR(50) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "menu_attributes_pkey" PRIMARY KEY ("attribute_id")
);

-- CreateTable
CREATE TABLE "menu_item_attributes" (
    "menu_item_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,

    CONSTRAINT "menu_item_attributes_pkey" PRIMARY KEY ("menu_item_id","attribute_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_kakaoId_key" ON "users"("kakaoId");

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_food_preferences" ADD CONSTRAINT "user_food_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_food_preferences" ADD CONSTRAINT "user_food_preferences_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "menu_attributes"("attribute_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_attributes" ADD CONSTRAINT "menu_attributes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_attributes" ADD CONSTRAINT "menu_item_attributes_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("menu_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_attributes" ADD CONSTRAINT "menu_item_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "menu_attributes"("attribute_id") ON DELETE RESTRICT ON UPDATE CASCADE;
