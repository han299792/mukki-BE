-- AlterTable
CREATE SEQUENCE menu_menu_id_seq;
ALTER TABLE "Menu" ALTER COLUMN "menu_id" SET DEFAULT nextval('menu_menu_id_seq');
ALTER SEQUENCE menu_menu_id_seq OWNED BY "Menu"."menu_id";
