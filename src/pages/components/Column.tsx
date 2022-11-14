import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Task } from "./Task";

interface ColProps {
  col: {
    title: string;
    id: string;
    boardId: string;
    [Tasks: string]: any;
  };
  [currentColumns: string]: any;
}

export const Column = ({ col, currentColumns }: ColProps) => {
  const { mutate } = trpc.boards.addTask.useMutation();
  const [taskForm, setTaskForm] = useState({
    columnId: col.id,
    data: {
      title: "New task 3",
      status: "n/a",
    },
  });

  const onSubmit = () => mutate(taskForm);

  return (
    <div className="my-2 ml-3">
      <div className="uppercase">
        <div className="column-icon-color"></div> {col.title} &#40;{" "}
        {col?.Tasks.length} &#41;
      </div>
      {col?.Tasks.map((task: any) => {
        return (
          <Task
            task={task}
            currentColumns={currentColumns}
            col={col}
            key={task.id}
          />
        );
      })}
    </div>
  );
};
