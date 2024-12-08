-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "photo_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Restaurants" ADD CONSTRAINT "Restaurants_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photo"("photo_id") ON DELETE SET NULL ON UPDATE CASCADE;
