import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { trpc } from "../../utils/trpc";
import { VscLoading } from "react-icons/vsc";

interface Props {
  editBoard: boolean;
  deleteBoard: boolean;
  closeModal: () => void;
}

export const BoardModals = ({ editBoard, deleteBoard, closeModal }: Props) => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const [hideColumn, setHideColumn] = useState("");

  const { data: board, refetch } = trpc.boards.singleBoard.useQuery(
    {
      boardId,
    },
    { refetchOnWindowFocus: false }
  );
  const { refetch: allBoardsRefetch } = trpc.boards.getAllBoards.useQuery();

  const { mutate: updateBoard } = trpc.boards.updateBoard.useMutation();

  const { mutate: deleteBoards } = trpc.boards.deleteBoard.useMutation();
  const { mutate: deleteColumn } = trpc.columns.deleteColumn.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: updateColumn } = trpc.columns.updateColumn.useMutation();
  const { mutate: addColumn, isLoading: addcolIsLoading } =
    trpc.columns.addColumn.useMutation({ onSuccess: () => refetch() });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    allBoardsRefetch();
    refetch();
    closeModal();
  };

  const deletedBoard = () => {
    deleteBoards(boardId);
    router.push("/");
    closeModal();
  };

  const deletedColumn = (colId: string) => {
    setHideColumn(colId);
    deleteColumn(colId);
  };

  return (
    <>
      <Transition appear show={editBoard || deleteBoard} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark_gray">
                  {editBoard && (
                    <>
                      <h3 className="heading-l mb-2 dark:text-white">
                        Edit board
                      </h3>
                      <div className="mt-2">
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-y-2"
                        >
                          <label htmlFor="title" className="label-title ">
                            Board Name
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={board?.title}
                            onChange={(e) =>
                              updateBoard({
                                boardId,
                                title: e.target.value,
                              })
                            }
                            placeholder="e.g. Web Design"
                            className="input-border body-l py-2"
                          />

                          <label className="label-title mt-2">
                            Board Columns
                          </label>

                          {board?.columns.map((col, index) => {
                            return (
                              <div
                                className={`${
                                  hideColumn !== col.id ? "" : "hidden"
                                } flex w-full`}
                                key={index}
                              >
                                <input
                                  type="text"
                                  defaultValue={col.title}
                                  onBlur={(e) =>
                                    updateColumn({
                                      columnId: col.id,
                                      title: e.target.value,
                                    })
                                  }
                                  className="input-border body-l w-full py-[.35rem]"
                                />
                                <button
                                  type="button"
                                  onClick={() => deletedColumn(col.id)}
                                  className="ml-1 inline-block rounded-full fill-[#828FA3] p-2 hover:fill-danger"
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
                            onClick={
                              (board?.columns?.length || 3) >= 4
                                ? () =>
                                    alert(
                                      "To add more columns upgarde to the Pro verison"
                                    )
                                : () => addColumn({ boardId })
                            }
                            className="btn-secondary-s mb-2 mt-2"
                          >
                            {addcolIsLoading ? (
                              <VscLoading className="mx-auto h-6 w-6 animate-spin" />
                            ) : (
                              " + Add New Column"
                            )}
                          </button>

                          <button
                            type="submit"
                            className="btn-primary-s mb-2 disabled:pointer-events-none disabled:opacity-80"
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </>
                  )}

                  {deleteBoard && (
                    <>
                      <h3 className="heading-l mb-2 text-danger">
                        Delete this board?
                      </h3>
                      <div className="flex flex-col gap-y-4">
                        <p className="body-l my-1 text-medium_gray">
                          Are you sure you want to delete the &#39;
                          <span className="font-bold">{board?.title}</span>
                          &#39; This action will remove all columns and tasks
                          and cannot be reversed.
                        </p>
                        <button
                          type="button"
                          onClick={deletedBoard}
                          className="btn-primary-s bg-danger hover:bg-danger_hover "
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="btn-secondary-s"
                        >
                          Cancel
                        </button>
                      </div>
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
