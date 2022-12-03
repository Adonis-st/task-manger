import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { CreateTaskInput, createTaskSchema } from "../../schema/task.schema";
import { trpc } from "../../utils/trpc";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { VscLoading } from "react-icons/vsc";

export const AddTaskModal = ({ setIsOpen }: any) => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { data: columns } = trpc.columns.getAllColumns.useQuery(
    {
      boardId,
    },
    { refetchOnWindowFocus: false }
  );
  const { refetch } = trpc.boards.singleBoard.useQuery(
    {
      boardId,
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate: addTask, isLoading } = trpc.tasks.addTask.useMutation({
    onSuccess: () => {
      refetch(), closeModal();
    },
  });
  const [newColumn, setNewColumn] = useState(columns?.[0]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    subtask: "",
  });

  const [displayColumnDropdown, setDisplayColumnDropdown] = useState(false);
  const closeModal = () => setIsOpen(false);

  const [subtaskForm, setSubtaskForm] = useState([
    { title: "", placeholer: "e.g. Make coffee", isCompleted: false },
    { title: "", placeholer: "e.g. Drink coffee & smile", isCompleted: false },
  ]);

  const addSubtask = () => {
    if (subtaskForm.length >= 5) {
      return alert("You can only have up to 5 subtasks");
    }
    const newSubtask = [
      ...subtaskForm,
      { title: "", placeholer: "", isCompleted: false },
    ];
    setSubtaskForm(newSubtask);
  };

  const removeSubtask = (subtaskIndex: number) => {
    const removedSubtask = [...subtaskForm].filter(
      (subtask, index) => index !== subtaskIndex
    );
    setSubtaskForm(removedSubtask);
  };

  const subtaskOnChange = (e: any, subtaskIndex: number) => {
    const { value } = e.target;
    setSubtaskForm((title) =>
      title?.map((subtask, index) =>
        index === subtaskIndex ? { ...subtask, title: value } : subtask
      )
    );
  };

  const changeColumn = (col: any) => {
    setDisplayColumnDropdown((prevState) => !prevState);
    setNewColumn(col);
  };

  const taskOnChange = (e: any) => {
    setTaskForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const subtaskData = [...subtaskForm].filter(
      (subtask) => subtask.title.length !== 0
    );
    const task: CreateTaskInput = {
      taskForm,
      columnId: newColumn?.id || `${columns?.[0]?.id}`,
      subtaskData,
    };
    const results = createTaskSchema.safeParse(task);
    if (!results.success) {
      const formattedErrors = results.error.format();
      setFormErrors((prevState) => ({
        ...prevState,
        title: formattedErrors.taskForm?.title?._errors.join(", ") || "",
        description:
          formattedErrors.taskForm?.description?._errors.join(", ") || "",
      }));
    } else {
      addTask(task);
    }
  };

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
                <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark_gray">
                  <Dialog.Title as="h3" className="heading-l dark:text-white">
                    Add Task
                  </Dialog.Title>
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
                        placeholder="e.g. Take coffee break"
                        className={`${
                          formErrors.title
                            ? "border-red-500"
                            : "border-medium_gray/25 dark:bg-dark_gray"
                        } input-border body-l py-2`}
                      />
                      <span className="form-error-message -mt-1">
                        {formErrors.title}
                      </span>

                      <label htmlFor="description" className="label-title mt-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={taskForm.description}
                        onChange={taskOnChange}
                        rows={4}
                        placeholder="e.g. It&#39;s always good to take a break. This 
                        15 minute break will recharge the batteries 
                        a little."
                        className={`${
                          formErrors.description
                            ? "border-red-500"
                            : "border-medium_gray/25 dark:bg-dark_gray"
                        } input-border body-l resize-none py-2`}
                      />
                      <span className="form-error-message -mt-2">
                        {formErrors.description}
                      </span>

                      <label className="label-title mt-4">SubTasks</label>
                      {subtaskForm?.map((subtask, index) => {
                        return (
                          <div className="mb-2 flex w-full" key={index}>
                            <input
                              type="text"
                              value={subtask.title}
                              onChange={(e) => subtaskOnChange(e, index)}
                              placeholder={subtask.placeholer}
                              className="input-border body-l w-full py-[.35rem]"
                            />
                            <button
                              type="button"
                              onClick={() => removeSubtask(index)}
                              className="ml-2 inline-block fill-medium_gray p-2 hover:fill-danger "
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
                        );
                      })}

                      <button
                        type="button"
                        onClick={addSubtask}
                        className="btn-secondary-s mb-2"
                      >
                        + Add New Subtask
                      </button>
                      <label htmlFor="status" className="label-title">
                        Status
                      </label>
                      <div className="input-border relative flex w-full justify-center py-2  font-medium hover:border-purple dark:bg-dark_gray dark:text-white ">
                        <button
                          type="button"
                          onClick={() =>
                            setDisplayColumnDropdown((prevState) => !prevState)
                          }
                          className="flex w-full justify-between text-left"
                        >
                          {newColumn?.title || columns?.[0]?.title}

                          <ChevronDownIcon
                            className={`${
                              displayColumnDropdown
                                ? "rotate-180 transform"
                                : ""
                            }  w-5 fill-purple `}
                          />
                        </button>
                        {displayColumnDropdown && (
                          <div className="absolute mt-12 flex w-full flex-col rounded-md bg-white/95 text-medium_gray dark:bg-very_dark_gray">
                            {columns?.map((col: any) => {
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
                      {isLoading ? (
                        <VscLoading className="mx-auto h-6 w-6 animate-spin" />
                      ) : (
                        "Create Task"
                      )}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
