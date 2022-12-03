import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { boardInput } from "../../schema/board.schema";
import { trpc } from "../../utils/trpc";
import { VscLoading } from "react-icons/vsc";

interface Props {
  setDisplayModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

export const AddBoardsModal = ({ setDisplayModal }: Props) => {
  const closeModal = () => setDisplayModal(false);
  const { refetch } = trpc.boards.getAllBoards.useQuery();

  const [boardForm, setBoardForm] = useState({
    title: "",
  });

  const [columnsForm, setColumnsForm] = useState([
    { title: "Todo" },
    { title: "Doing" },
    { title: "Done" },
  ]);

  const { mutate, isLoading } = trpc.boards.addBoard.useMutation({
    onSuccess: () => {
      refetch(), closeModal();
    },
  });

  const addCol = () => {
    if (columnsForm.length >= 4) {
      return alert("You can only have up to 4 cols");
    }
    const newCols = [...columnsForm, { title: "Done" }];
    setColumnsForm(newCols);
  };

  const removeCol = (colIndex: number) => {
    if (columnsForm.length <= 1) {
      return alert("You have to have 1 columns");
    }
    const removedCol = [...columnsForm].filter(
      (col, index) => index !== colIndex
    );
    setColumnsForm(removedCol);
  };

  const columnOnChange = (e: any, colIndex: number) => {
    const { value } = e.target;
    setColumnsForm((title) =>
      title?.map((col, index) =>
        index === colIndex ? { ...col, title: value } : col
      )
    );
  };
  const boardOnChange = (e: any) => {
    setBoardForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const boardInputs: boardInput = { boardForm, columnsForm };
    mutate(boardInputs);
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
            <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left  align-middle shadow-xl transition-all dark:bg-dark_gray">
                  <Dialog.Title as="h3" className="heading-l dark:text-white">
                    Add New Board
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-y-2"
                    >
                      <label htmlFor="title" className="label-title">
                        Board Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={boardForm.title}
                        onChange={boardOnChange}
                        placeholder="e.g. Web Design"
                        className="input-border body-l py-2"
                      />

                      <label className="label-title">Board Columns</label>
                      {columnsForm.map((col, index) => {
                        return (
                          <div className="flex w-full" key={index}>
                            <input
                              type="text"
                              value={col.title}
                              onChange={(e) => columnOnChange(e, index)}
                              className="input-border body-l w-full py-[.35rem]"
                            />
                            <button
                              type="button"
                              onClick={() => removeCol(index)}
                              className="ml-1 inline-block fill-[#828FA3] p-2 hover:fill-danger "
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
                        onClick={addCol}
                        className="btn-secondary-s mb-2"
                      >
                        + Add New Column
                      </button>

                      <button
                        type="submit"
                        className="btn-primary-s mb-2 disabled:pointer-events-none disabled:opacity-80"
                      >
                        {isLoading ? (
                          <VscLoading className="mx-auto h-6 w-6 animate-spin" />
                        ) : (
                          "Create Board"
                        )}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
