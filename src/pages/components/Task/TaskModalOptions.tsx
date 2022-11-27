import { MdModeEdit, MdDelete } from "react-icons/md";
import { useState } from "react";

export const TaskModalOptions = ({ setEditTask, setDeleteTask }: any) => {
  const [showTaskOptions, setShowTaskOptions] = useState(false);

  return (
    <div
      onClick={() => setShowTaskOptions((prevState) => !prevState)}
      className=" relative mr-2 cursor-pointer rounded-full px-3 py-1 text-2xl hover:bg-gray-100 hover:dark:bg-very_dark_gray"
    >
      <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>

      {showTaskOptions && (
        <div className="absolute z-20 ml-[-3.5rem] mt-2 block rounded-md bg-lines_light/90 text-xs font-semibold dark:bg-very_dark_gray">
          <button
            onClick={() => setEditTask((prevState) => !prevState)}
            className="flex w-full items-center justify-center rounded-t-md py-2 tracking-wide text-medium_gray hover:bg-purple_hover/75 hover:text-white dark:hover:text-coal"
          >
            <MdModeEdit />
            <span className="ml-1">Edit Task</span>
          </button>
          <hr className=" border-coal/50 dark:border-coal" />
          <button
            onClick={() => setDeleteTask((prevState) => !prevState)}
            className="flex w-max items-center justify-center rounded-b-md py-2 px-4 tracking-wide text-danger hover:bg-danger/90 hover:text-white dark:hover:text-coal"
          >
            <MdDelete />
            <span className="ml-1">Delete Task</span>
          </button>
        </div>
      )}
    </div>
  );
};
