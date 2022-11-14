import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { CreateSubTaskInput } from "../../schema/task.schema";
import { TaskModal } from "./TaskModal";

export const Task = ({ task, currentColumns, col }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const [changeCol, setChangeCol] = useState({
    id: task.id,
    newColumnId: "cla8nxiuo00092xh2bg45n0n2",
  });

  const { mutate } = trpc.boards.changeTaskCol.useMutation();

  // const onSubmit = () => mutate(subTaskForm);

  // if (isLoading) {
  //   return <p>Loading tasks...</p>;
  // }

  let completedSubtask = [...task?.SubTasks].filter(
    (subtask, index) => subtask.isCompleted !== false
  );
  const [test, setTest] = useState(completedSubtask);
  const onSubmit = () => mutate(changeCol);
  return (
    <div
      onClick={() => setIsOpen((prevState) => !prevState)}
      className="mb-5 min-w-[280px] cursor-pointer rounded-md bg-gray-100 p-2"
    >
      <h4 className="heading-m text-coal">{task.title}</h4>
      <span className="body-m text-medium_gray">
        {completedSubtask.length} of {task?.SubTasks.length}
      </span>
      {isOpen && (
        <TaskModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          task={task}
          currentColumns={currentColumns}
          thisColumn={col}
        />
      )}

      {/* <button onClick={onSubmit} className="m-3 bg-red-400">
        change Col
      </button> */}
    </div>
  );
};
