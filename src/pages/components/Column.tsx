import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Task } from "./Task/Task";
interface ColProps {
  col: {
    title: string;
    id: string;
    boardId: string;
    [Tasks: string]: any;
  };
  [currentColumns: string]: any;
  refetch: any;
  index: number;
}

export const Column = ({ col, currentColumns, refetch, index }: ColProps) => {
  const { mutate } = trpc.boards.addTask.useMutation();
  const [taskForm, setTaskForm] = useState({
    columnId: col.id,
    data: {
      title: "New task 3",
      status: "n/a",
    },
  });

  let color = "bg-[#67e2ae]";
  if ((index + 1) % 3 === 1) {
    color = "bg-[#49c4e5]";
  } else if ((index + 1) % 3 === 2) {
    color = "bg-[#8471f2]";
  }

  return (
    <div className="mt-4 min-w-[270px] px-1 first:pl-5 last:pr-5">
      <div className="heading-s uppercase text-medium_gray">
        <div className={`${color} column-icon-color`}></div> {col.title} &#40;
        <span className="mx-[.1rem]">{col?.Tasks.length}</span>&#41;
      </div>
      {col?.Tasks.map((task: any) => {
        return (
          <Task
            task={task}
            currentColumns={currentColumns}
            col={col}
            refetch={refetch}
            key={task.id}
          />
        );
      })}
    </div>
  );
};
