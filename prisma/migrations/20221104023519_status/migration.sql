/*
  Warnings:

  - Added the required column `status` to the `SubTasks` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `SubTasks` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SubTasks" ADD COLUMN     "status" BOOLEAN NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
