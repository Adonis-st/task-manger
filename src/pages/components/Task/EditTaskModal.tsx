import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import {
  UpdateTaskColInput,
  updateTaskColSchema,
  updateSubtaskSchema,
  updateSubtaskInput,
} from "../../../schema/task.schema";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { VscLoading } from "react-icons/vsc";

interface Props {
  task: any;
  thisColumn: any;
  currentColumns: [];
  refetch: any;
  setEditTask: any;
}

export const EditTaskModal = ({
  task,
  thisColumn,
  currentColumns,
  refetch,
  setEditTask,
}: Props) => {
  const [taskForm, setTaskForm] = useState({
    title: task.title,
    description: task.description,
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    subtaskTitle: "",
    subtaskId: "",
  });
  const [hideSubtask, setHideSubtask] = useState("");
  const [newColumn, setNewColumn] = useState(thisColumn);
  const { title, description } = taskForm;

  const { mutate: updateSubtask } = trpc.boards.updateSubtask.useMutation({
    onSuccess: () =>
      setFormErrors((prevState) => ({
        ...prevState,
        subtaskTitle: "",
        subtaskId: "",
      })),
  });
  const { mutate: updateTask, isLoading: taskIsLoading } =
    trpc.boards.updateTaskCol.useMutation({
      onSuccess: () => {
        refetch(), setEditTask(false);
      },
    });

  const { mutate: deleteSubtask, isLoading: deleteSubtaskIsLoading } =
    trpc.boards.deleteSubtask.useMutation({
      onSuccess: () => refetch(),
    });

  const { mutate: addSubtask, isLoading: subtaskIsLoading } =
    trpc.boards.addSubtask.useMutation({
      onSuccess: () => refetch(),
    });

  const [displayColumnDropdown, setDisplayColumnDropdown] = useState(false);

  const taskOnChange = (e: any) => {
    setTaskForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const newColumnId: string = newColumn.id;

  const onSubmit = (e: any) => {
    e.preventDefault();
    const changedCol: UpdateTaskColInput = {
      newColumnId,
      id: task.id,
      title,
      description,
    };
    const results = updateTaskColSchema.safeParse(changedCol);
    if (!results.success) {
      const formattedErrors = results.error.format();
      setFormErrors((prevState) => ({
        ...prevState,
        title: formattedErrors.title?._errors.join(", ") || "",
        description: formattedErrors.description?._errors.join(", ") || "",
      }));
    } else {
      updateTask(changedCol);
    }
  };

  const changeColumn = (col: any) => {
    setDisplayColumnDropdown((prevState) => !prevState);
    setNewColumn(col);
  };

  const updatedSubtask = (
    { title, id }: updateSubtaskInput,
    oldTitle: string
  ) => {
    const results = updateSubtaskSchema.safeParse({ title, id });
    if (!results.success) {
      console.log(title);
      const formattedErrors = results.error.format();
      setFormErrors((prevState) => ({
        ...prevState,
        subtaskTitle: formattedErrors.title?._errors.join(", ") || "",
        subtaskId: id,
      }));
    } else {
      if (title !== oldTitle) {
        updateSubtask({ title, id });
      }
    }
  };
  const deletedSubtask = (subId: string) => {
    setHideSubtask(subId);
    deleteSubtask(subId);
  };

  return (
    <>
      <h3 className="heading-l mb-4 dark:text-white">Edit Task</h3>
      <form onSubmit={onSubmit}>
        <div className="mt-2 flex flex-col gap-y-2">
          <label htmlFor="title" className="label-title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={taskForm.title}
            onChange={taskOnChange}
            className={` ${
              formErrors.title
                ? "border-red-500"
                : "border-medium_gray/25 dark:bg-dark_gray"
            } input-border body-l  py-2 hover:border-purple_hover`}
          />

          <span className="form-error-message -mt-1">{formErrors.title}</span>

          <label htmlFor="description" className="label-title mt-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={taskForm.description}
            onChange={taskOnChange}
            rows={4}
            className={`${
              formErrors.description
                ? "border-red-500"
                : "border-medium_gray/25 dark:bg-dark_gray"
            } input-border body-l resize-none py-2 hover:border-purple_hover`}
          />

          <span className="form-error-message -mt-1 ">
            {formErrors.description}
          </span>

          <label className="label-title mt-4">SubTasks</label>
          {task?.SubTasks?.map((sub: any, index: number) => {
            return (
              <div
                key={sub.id}
                className={hideSubtask !== sub.id ? "" : "hidden"}
              >
                <div className="mb-2 flex w-full items-center">
                  <input
                    type="text"
                    defaultValue={sub.title}
                    onBlur={(e: any) =>
                      updatedSubtask(
                        { title: e.currentTarget.value, id: sub.id },
                        sub.title
                      )
                    }
                    className={`${
                      formErrors.subtaskTitle && formErrors.subtaskId === sub.id
                        ? "border-red-500"
                        : "border-medium_gray/25 dark:bg-dark_gray"
                    } input-border relative mr-2 w-full py-1 lg:py-[.45rem]`}
                  />
                  {formErrors.subtaskId === sub.id && (
                    <span className="form-error-message absolute right-0 mr-[4.5rem] text-xs">
                      {formErrors.subtaskTitle}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => deletedSubtask(sub.id)}
                    className="fill-medium_gray p-2 hover:fill-danger"
                  >
                    <svg
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fillRule="evenodd">
                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={
              task.SubTasks.length >= 4
                ? () => alert("Upgrade to the pro version ")
                : () => addSubtask(task.id)
            }
            className="btn-secondary-s mb-2 disabled:pointer-events-none disabled:opacity-70"
          >
            {subtaskIsLoading ? (
              <VscLoading className="mx-auto h-6 w-6 animate-spin" />
            ) : (
              "+ Add New Subtask"
            )}
          </button>
          <label className="label-title">Status</label>

          <div className="input-border relative flex w-full justify-center py-2  font-medium hover:border-purple dark:bg-dark_gray dark:text-white ">
            <button
              type="button"
              onClick={() =>
                setDisplayColumnDropdown((prevState) => !prevState)
              }
              className="flex w-full justify-between text-left"
            >
              {newColumn.title}
              <ChevronDownIcon
                className={`${
                  displayColumnDropdown ? "rotate-180 transform" : ""
                }  w-5 fill-purple `}
              />
            </button>
            {displayColumnDropdown && (
              <div className="absolute mt-12 flex w-full flex-col rounded-md bg-white/95 text-medium_gray  dark:bg-very_dark_gray">
                {currentColumns.map((col: any) => {
                  return (
                    <button
                      type="button"
                      onClick={() => changeColumn(col)}
                      key={col.id}
                      className="w-full py-1 pl-4 text-left first:rounded-t-md last:rounded-b-md hover:bg-gray-200"
                    >
                      {col.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary-s mt-5 w-full">
          {taskIsLoading ? (
            <VscLoading className="mx-auto h-6 w-6 animate-spin" />
          ) : (
            " Save Changes"
          )}
        </button>
      </form>
    </>
  );
};
