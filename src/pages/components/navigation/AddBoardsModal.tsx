import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { boardInput } from "../../../schema/board.schema";
import { trpc } from "../../../utils/trpc";

interface Props {
  setDisplayModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
  refetch: any;
  getAllBoards: any;
  latestBoard: any;
}

export const AddBoardsModal = ({
  setDisplayModal,
  refetch,
  getAllBoards,
  latestBoard,
}: Props) => {
  const router = useRouter();
  const closeModal = () => setDisplayModal(false);
  const [boardForm, setBoardForm] = useState({
    title: "",
  });
  const [columnsForm, setColumnsForm] = useState([
    { title: "Todo" },
    { title: "Doing" },
    { title: "Done" },
  ]);
  // const { data: testing2 } = trpc.boards.findNewBoard.useQuery();

  const { mutate, isSuccess, isIdle } = trpc.boards.addBoard.useMutation({
    onSuccess: () => {},
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    const boardInputs: boardInput = { boardForm, columnsForm };
    mutate(boardInputs);
    console.log(isSuccess + "sucess");
    console.log(isIdle + "idle");

    if (isSuccess) {
      console.log("yess");
    }

    // router.push(`/boards/${latestBoard?.id}`);
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
                    <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
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
                      <button
                        type="button"
                        onClick={addCol}
                        className="btn-secondary-s mb-2"
                      >
                        + Add New Column
                      </button>

                      <button
                        type="submit"
                        disabled={!boardForm.title}
                        className="btn-primary-s mb-2 disabled:pointer-events-none disabled:opacity-80"
                      >
                        Create Board
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
