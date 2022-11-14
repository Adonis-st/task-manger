import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { trpc } from "../../utils/trpc";

export const TaskModal = ({
  isOpen,
  setIsOpen,
  task,
  currentColumns,
  thisColumn,
}: any) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [columnId, setColumnId] = useState(" ");
  const test = { value: "", label: "" };
  const { mutate } = trpc.boards.changeTaskCol.useMutation();
  const changeTaskColumn = (e: any) => {
    setColumnId(e.target.value);
    // const newTaskCol = {task.id , columnId}
    // mutate();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {true && (
                    <>
                      <Dialog.Title as="h3" className="heading-l">
                        {task.title}
                      </Dialog.Title>

                      <div className="mt-2 flex flex-col gap-y-2">
                        <p>{task.description}</p>

                        <label className="label-title">SubTasks</label>
                        {task.SubTasks?.map((sub: any) => {
                          return (
                            <div className="flex items-center">
                              <label
                                htmlFor={sub.id}
                                className={`${
                                  sub.isCompleted && "line"
                                }line-through`}
                              >
                                {sub.title}
                              </label>
                              <input
                                type="checkbox"
                                defaultChecked={sub.isCompleted}
                                id={sub.id}
                                className="order-[-1] mr-1 "
                              />
                            </div>
                          );
                        })}

                        <label htmlFor="status" className="label-title">
                          Status
                        </label>
                        <select
                          name="status"
                          id="status"
                          value={columnId}
                          onChange={changeTaskColumn}
                          defaultValue={thisColumn.id}
                          className="input-border py-2"
                        >
                          {currentColumns.map((col: any) => {
                            return (
                              <option value={col.id} key={col.id}>
                                {col.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  )}
                  {false && (
                    <>
                      <Dialog.Title as="h3" className="heading-l">
                        Edit Task
                      </Dialog.Title>
                      <form action="">
                        <div className="mt-2 flex flex-col gap-y-2">
                          <label htmlFor="title" className="label-title">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={task.title}
                            className="input-border body-l mb-2 py-2"
                          />
                          <label htmlFor="description" className="label-title">
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            defaultValue={task.description}
                            rows={5}
                            className="input-border body-l mb-4 resize-none"
                          ></textarea>
                          <label className="label-title">SubTasks</label>
                          {task.SubTasks?.map((sub: any) => {
                            return (
                              <div className="mb-2 flex w-full items-center">
                                <input
                                  type="text"
                                  value={sub.title}
                                  className="input-border mr-3 w-[85%] py-1"
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
                              </div>
                            );
                          })}
                          <button className="btn-secondary-s ">
                            + Add New Subtask
                          </button>

                          <label htmlFor="status" className="label-title">
                            Status
                          </label>
                          <select
                            name="status"
                            id="status"
                            defaultValue={thisColumn.id}
                            className="input-border py-2"
                          >
                            {currentColumns.map((col: any) => {
                              return (
                                <option value={col.id} key={col.id}>
                                  {col.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="btn-primary-s mt-5 w-full"
                          onClick={closeModal}
                        >
                          Create Task
                        </button>
                      </form>
                    </>
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
