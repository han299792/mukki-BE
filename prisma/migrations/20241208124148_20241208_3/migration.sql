/*
  Warnings:

  - You are about to drop the column `image` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `file_path` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "file_path" VARCHAR(255) NOT NULL;
