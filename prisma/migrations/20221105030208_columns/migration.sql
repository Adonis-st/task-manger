/*
  Warnings:

  - You are about to drop the column `status` on the `SubTasks` table. All the data in the column will be lost.
  - You are about to drop the column `tasksId` on the `SubTasks` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `isCompleted` to the `SubTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `SubTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubTasks" DROP CONSTRAINT "SubTasks_tasksId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_boardId_fkey";

-- AlterTable
ALTER TABLE "SubTasks" DROP COLUMN "status",
DROP COLUMN "tasksId",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL,
ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "boardId",
ADD COLUMN     "columnId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Columns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "boardId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Columns_id_key" ON "Columns"("id");

-- AddForeignKey
ALTER TABLE "Boards" ADD CONSTRAINT "Boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
