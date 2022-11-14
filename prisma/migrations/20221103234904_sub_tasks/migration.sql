-- CreateTable
CREATE TABLE "SubTasks" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "completedDateTime" TIMESTAMP(3),
    "order" INTEGER,
    "tasksId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubTasks_id_key" ON "SubTasks"("id");

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_tasksId_fkey" FOREIGN KEY ("tasksId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
