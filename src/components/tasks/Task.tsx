import { useState } from "react";
import { TaskModal } from "./TaskModal";

export const Task = ({ task, currentColumns, col, refetch }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const completedSubtask = [...task?.SubTasks].filter(
    (subtask) => subtask.isCompleted !== false
  );

  return (
    <div
      onClick={() => setIsOpen((prevState) => !prevState)}
      className="my-5 flex min-w-[280px] cursor-pointer flex-col gap-y-3 rounded-md bg-white py-5 px-4 shadow-md dark:bg-dark_gray"
    >
      <h4 className="heading-m text-coal dark:text-white">{task.title}</h4>

      <span className="body-m text-medium_gray">
        {task?.SubTasks.length
          ? `${completedSubtask.length} of
          ${task?.SubTasks.length} `
          : "No Subtasks"}
      </span>

      {isOpen && (
        <TaskModal
          setIsOpen={setIsOpen}
          task={task}
          currentColumns={currentColumns}
          thisColumn={col}
          completedSubtask={completedSubtask}
          refetch={refetch}
        />
      )}
    </div>
  );
};
