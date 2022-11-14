import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { CreateTaskInput } from "../../../schema/task.schema";
import { trpc } from "../../../utils/trpc";

export const AddTaskModal = ({ isOpen, setIsOpen }: any) => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { data: columns } = trpc.boards.getAllColumns.useQuery({ boardId });
  const { mutate } = trpc.boards.addTask.useMutation();
  const [columnId, setColumnId] = useState(" ");

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

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
    if (subtaskForm.length <= 1) {
      return alert("You have to have 1 columns");
    }
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

  const taskOnChange = (e: any) => {
    setTaskForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const task: CreateTaskInput = { taskForm, columnId, subtaskForm };
    mutate(task);
    closeModal();
  };

  return (
    <>
      <></>
      <Transition appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="heading-l">
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
                        className="input-border body-l mb-2 py-2"
                      />
                      <label htmlFor="description" className="label-title">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={taskForm.description}
                        onChange={taskOnChange}
                        rows={5}
                        placeholder="e.g. It&#39;s always good to take a break. This 
                        15 minute break will recharge the batteries 
                        a little."
                        className="input-border body-l mb-4 resize-none"
                      ></textarea>
                      <label className="label-title">SubTasks</label>
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
                              className="ml-2 inline-block rounded-full p-1 "
                            >
                              <svg
                                width="15"
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g fill="#828FA3" fillRule="evenodd">
                                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                      {/* <div className="mb-2 flex w-full items-center">
                        <input
                          type="text"
                          className="input-border mr-3 w-[85%] py-1"
                          placeholder="e.g. Drink coffee & smile"
                        />
                        <svg
                          width="15"
                          height="15"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="#828FA3" fillRule="evenodd">
                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                          </g>
                        </svg>
                      </div> */}
                      <button
                        type="button"
                        onClick={addSubtask}
                        className="btn-secondary-s"
                      >
                        + Add New Subtask
                      </button>
                      {/* <input type="text" className="input-border" /> */}
                      <label htmlFor="status" className="label-title">
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="input-border py-2"
                        value={columnId}
                        onChange={(e: any) => setColumnId(e.target.value)}
                      >
                        <option value=""></option>
                        {columns?.map((col: any) => {
                          return (
                            <option value={col.id} key={col.id}>
                              {col.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button type="submit" className="btn-primary-s mt-5 w-full">
                      Create Task
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
