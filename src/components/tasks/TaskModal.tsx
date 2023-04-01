import { Dialog, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import type { UpdateTaskInput, updateSubtaskInput } from "~/schema/task.schema";
import { updateSubtaskSchema, updateTaskSchema } from "~/schema/task.schema";
import { trpc } from "~/utils/trpc";

export const TaskModal = ({
  setIsOpen,
  task,
  currentColumns,
  thisColumn,
  completedSubtask,
}: any) => {
  // Modals
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const utils = trpc.useContext();
  const closeModal = () => setIsOpen(false);

  const { mutate: changeTaskColumn } = trpc.tasks.changeTaskColumn.useMutation({
    onSuccess: () => {
      utils.boards.singleBoard.invalidate(), closeModal();
    },
  });
  const { mutate: toggleSubtask } = trpc.tasks.toggleSubTask.useMutation({
    onSuccess: () => utils.boards.singleBoard.invalidate(),
  });

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform   rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark_gray md:max-w-[480px]">
                  {!editTask && !deleteTask && (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="heading-l flex items-center justify-between dark:text-white"
                      >
                        {task.title}
                        <TaskModalOptions
                          setEditTask={setEditTask}
                          setDeleteTask={setDeleteTask}
                        />
                      </Dialog.Title>

                      <div className="mt-2 flex flex-col gap-y-2">
                        <p className="body-l mb-1 text-medium_gray">
                          {task.description}
                        </p>

                        <label className="label-title ">
                          SubTasks &#40;{completedSubtask.length} of{" "}
                          {task?.SubTasks.length}&#41;
                        </label>
                        {task.SubTasks?.map((sub: any) => {
                          return (
                            <div
                              className="bg mb-1 flex items-center rounded-sm bg-light_gray hover:bg-purple/25 dark:bg-very_dark_gray"
                              key={sub.id}
                            >
                              <input
                                type="checkbox"
                                id={sub.id}
                                onChange={() =>
                                  toggleSubtask({
                                    id: sub.id,
                                    isCompleted: !sub.isCompleted,
                                  })
                                }
                                defaultChecked={sub.isCompleted}
                                className="next relative ml-3 aspect-square w-4 cursor-pointer appearance-none rounded-sm border border-medium_gray bg-white checked:bg-purple checked:before:border-white"
                              />
                              <label
                                htmlFor={sub.id}
                                className="checkbox-label w-full cursor-pointer py-2 pl-3 pr-4 text-[.75rem] font-bold leading-[.945rem] dark:text-white"
                              >
                                {sub.title}
                              </label>
                            </div>
                          );
                        })}

                        <label className="label-title mt-3">
                          Current Status
                        </label>

                        <Popover className="input-border relative flex w-full justify-center py-2  font-medium hover:border-purple dark:bg-dark_gray dark:text-white ">
                          {({ open }) => (
                            <>
                              <Popover.Button className="flex w-full justify-between text-left">
                                {thisColumn.title}
                                <ChevronDownIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  }  w-5 fill-purple `}
                                />
                              </Popover.Button>
                              <Popover.Panel className="absolute mt-12 flex w-full flex-col rounded-md bg-white/95 text-medium_gray dark:bg-very_dark_gray">
                                {currentColumns.map((col: any) => {
                                  return (
                                    <button
                                      onClick={() =>
                                        changeTaskColumn({
                                          id: task.id,
                                          columnId: col.id,
                                        })
                                      }
                                      className="w-full py-1 pl-4 text-left first:rounded-t-md last:rounded-b-md hover:bg-gray-200"
                                      key={col.id}
                                    >
                                      {col.title}
                                    </button>
                                  );
                                })}
                              </Popover.Panel>
                            </>
                          )}
                        </Popover>
                      </div>
                    </>
                  )}

                  {editTask && (
                    <EditTaskModal
                      task={task}
                      thisColumn={thisColumn}
                      currentColumns={currentColumns}
                      setEditTask={setEditTask}
                    />
                  )}

                  {deleteTask && (
                    <DeleteTaskModal task={task} closeModal={closeModal} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

interface DeleteTaskProps {
  task: any;
  closeModal: any;
}
const DeleteTaskModal = ({ task, closeModal }: DeleteTaskProps) => {
  const utils = trpc.useContext();

  const { mutate: deleteTask, isLoading } = trpc.tasks.deleteTask.useMutation({
    onSuccess: () => {
      utils.boards.singleBoard.invalidate(), closeModal();
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="heading-l text-danger">Delete this task?</h3>
      <p className="body-l my-1 text-medium_gray ">
        Are you sure you want to delete the &#39;
        <span className="font-bold">{task.title}</span>
        &#39; task and its subtasks? This action cannot be reversed.
      </p>
      <div className="flex gap-y-4 max-sm:flex-col sm:gap-x-2">
        <button
          type="button"
          onClick={() => deleteTask(task.id)}
          className="btn-primary-s bg-danger text-center hover:bg-danger_hover sm:w-full"
        >
          {isLoading ? (
            <VscLoading className="mx-auto h-6 w-6 animate-spin" />
          ) : (
            "Delete"
          )}
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="btn-secondary-s sm:w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface EditTaskProps {
  task: any;
  thisColumn: any;
  currentColumns: [];
  setEditTask: any;
}

export const EditTaskModal = ({
  task,
  thisColumn,
  currentColumns,
  setEditTask,
}: EditTaskProps) => {
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

  const utils = trpc.useContext();

  const { mutate: updateSubtask } = trpc.tasks.updateSubtask.useMutation({
    onSuccess: () =>
      setFormErrors((prevState) => ({
        ...prevState,
        subtaskTitle: "",
        subtaskId: "",
      })),
  });
  const { mutate: updateTask, isLoading: taskIsLoading } =
    trpc.tasks.updateTask.useMutation({
      onSuccess: () => {
        utils.boards.singleBoard.invalidate(), setEditTask(false);
      },
    });

  const { mutate: deleteSubtask } = trpc.tasks.deleteSubtask.useMutation({
    onSuccess: () => utils.boards.singleBoard.invalidate(),
  });

  const { mutate: addSubtask, isLoading: subtaskIsLoading } =
    trpc.tasks.addSubtask.useMutation({
      onSuccess: () => utils.boards.singleBoard.invalidate(),
    });

  const [displayColumnDropdown, setDisplayColumnDropdown] = useState(false);

  const taskOnChange = (e: any) => {
    setTaskForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const changedCol: UpdateTaskInput = {
      newColumnId: newColumn.id,
      id: task.id,
      title,
      description,
    };

    //
    const results = updateTaskSchema.safeParse(changedCol);
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

  return (
    <>
      <h3 className="heading-l mb-4 dark:text-white">Edit Task</h3>
      <form onSubmit={handleSubmit}>
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
          {task?.SubTasks?.map((sub: any) => {
            return (
              <div
                className={hideSubtask !== sub.id ? "" : "hidden"}
                key={sub.id}
              >
                <div className="mb-2 flex w-full items-center">
                  <input
                    type="text"
                    defaultValue={sub.title}
                    onBlur={(e) =>
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

const TaskModalOptions = ({ setEditTask, setDeleteTask }: any) => {
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
            onClick={() => setEditTask((prevState: boolean) => !prevState)}
            className="flex w-full items-center justify-center rounded-t-md py-2 tracking-wide text-medium_gray hover:bg-purple_hover/75 hover:text-white dark:hover:text-coal"
          >
            <MdModeEdit />
            <span className="ml-1">Edit Task</span>
          </button>
          <hr className=" border-coal/50 dark:border-coal" />
          <button
            onClick={() => setDeleteTask((prevState: boolean) => !prevState)}
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
