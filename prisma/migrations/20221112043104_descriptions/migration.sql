/*
  Warnings:

  - You are about to drop the column `status` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "status",
ADD COLUMN     "description" TEXT;
