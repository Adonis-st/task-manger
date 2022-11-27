import { trpc } from "../../../utils/trpc";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import {
  UpdateTaskColInput,
  ToggleSubTaskInput,
} from "../../../schema/task.schema";
import { useRouter } from "next/router";
import { TaskModalOptions } from "./TaskModalOptions";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const TaskModal = ({
  setIsOpen,
  task,
  currentColumns,
  thisColumn,
  completedSubtask,
  refetch,
}: any) => {
  // Modals
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const closeModal = () => setIsOpen(false);
  const [taskForm, setTaskForm] = useState({
    title: task.title,
    description: task.description,
  });
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { title, description } = taskForm;

  const changeColumn = useRef(thisColumn.id);
  const test2 = useRef(false);
  const { mutate: updateTask } = trpc.boards.updateTaskCol.useMutation({
    onSuccess: () => refetch(),
  });
  const { mutate: toggleSubtask } = trpc.boards.toggleSubTask.useMutation();
  // const { mutate: updateSubtask } = trpc.boards.updateSubtask.useMutation();
  // const [subtaskForm, setSubtaskForm] = useState(task?.SubTasks);
  const changeTaskColumn = (colId: string) => {
    changeColumn.current = colId;
    const newColumnId = changeColumn.current;
    const changedCol: UpdateTaskColInput = {
      newColumnId,
      id: task.id,
      title,
      description,
    };
    updateTask(changedCol);
    closeModal();
  };

  // const editSubtask = (e: any, subtaskIndex: number, id: string) => {
  //   const { value } = e.target;
  //   // Update Subtask title
  //   setSubtaskForm((title: any) =>
  //     title?.map((subtask: any, index: number) =>
  //       index === subtaskIndex ? { ...subtask, title: value } : subtask
  //     )
  //   );
  //   // const cool = subtask.find((sub: any) => sub.id === id);
  //   // setSubtaskTitle((prevState) => ({
  //   //   ...prevState,
  //   //   title: cool.title,
  //   // }));
  //   // console.log(subtaskTitle);
  // };

  const subtaskOnChange = (sub: any) => {
    test2.current = !sub.isCompleted;
    const id = sub.id;
    const isCompleted = test2.current;
    const toggle: ToggleSubTaskInput = { id, isCompleted };
    toggleSubtask(toggle);
  };

  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   const id = task.id;
  //   const changedCol: UpdateTaskColInput = {
  //     newColumnId,
  //     id,
  //     title,
  //     description,
  //   };

  //   const updatedSubtask: updateSubtaskInput = { id, subtaskForm };
  //   updateSubtask(updatedSubtask);
  //   updateTask(changedCol);
  //   // closeModal();
  // };

  // if (true) {
  //   return null;
  // }

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
                                onChange={() => subtaskOnChange(sub)}
                                defaultChecked={sub.isCompleted}
                                className="next relative  ml-3 aspect-square w-4  cursor-pointer appearance-none rounded-sm border border-medium_gray bg-white checked:bg-purple  checked:before:border-white "
                              />
                              <label
                                htmlFor={sub.id}
                                className="checkbox-label w-full cursor-pointer py-2 pl-3  pr-4 text-[.75rem] font-bold leading-[.945rem] dark:text-white"
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
                              <Popover.Panel className="absolute mt-12 flex w-full flex-col rounded-md bg-white/95 text-medium_gray  dark:bg-very_dark_gray">
                                {currentColumns.map((col: any) => {
                                  return (
                                    <button
                                      onClick={() => changeTaskColumn(col.id)}
                                      key={col.id}
                                      className=" w-full py-1 pl-4 text-left first:rounded-t-md last:rounded-b-md hover:bg-gray-200"
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
                      refetch={refetch}
                      setEditTask={setEditTask}
                    />
                  )}

                  {deleteTask && (
                    <DeleteTaskModal
                      task={task}
                      refetch={refetch}
                      closeModal={closeModal}
                    />
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
