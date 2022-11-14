import { Popover, Transition, Switch } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { AddBoardsModal } from "./AddBoardsModal";

export const BoardsDropdown = () => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { data: getAllBoards, isSuccess } = trpc.boards.getAllBoards.useQuery();
  const { data: singleBoard } = trpc.boards.getSingleBoard.useQuery({
    boardId,
  });
  const [darkMode, setDarkmode] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  return (
    <div className=" top-16 w-full max-w-sm px-4 ">
      <AddBoardsModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />

      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center  hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="heading-l min-w-[120px] max-w-fit">
                {singleBoard?.title
                  ? singleBoard?.title
                  : " + Create new Board"}
              </span>
              <ChevronDownIcon
                className={`${open ? "rotate-180 transform" : "text-opacity-70"}
                  ml-1 h-5 w-5 text-purple transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-[70%] z-10 mt-3 w-[85vw] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative flex flex-col gap-y-4 bg-white py-5 pr-10 lg:grid-cols-2">
                    <h4 className="heading-s ml-4 justify-self-center uppercase text-medium_gray">
                      all boards &#40;{getAllBoards?.length}&#41;
                    </h4>

                    {getAllBoards?.map((board: any) => (
                      <Link
                        key={board.id}
                        href={`/boards/${board.id}`}
                        className="group -m-2 flex items-center rounded-full rounded-l-none px-2 py-4 transition duration-150  ease-in-out  hover:bg-purple focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="ml-4 flex h-4 w-5 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                          <svg
                            className=" fill-medium_gray group-hover:fill-white"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                          </svg>
                        </div>
                        <div className="ml-2">
                          <p className="heading-m text-medium_gray group-hover:text-white">
                            {board.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <a href="##" className="group flex items-center">
                      <div className="ml-[1.1rem]">
                        <svg
                          className=" fill-purple group-hover:fill-medium_gray"
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                        </svg>
                      </div>
                      <div className="ml-2">
                        <button
                          onClick={() => setDisplayModal(true)}
                          className="heading-m text-purple group-hover:text-medium_gray"
                        >
                          + Create New Board
                        </button>
                      </div>
                    </a>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flow-root rounded-md bg-light_gray px-2 py-4 transition duration-150 ease-in-out">
                      <div className="flex items-center justify-center">
                        <div className="flex  w-1/2 items-center justify-between">
                          <svg
                            width="19"
                            height="19"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                              fill="#828FA3"
                            />
                          </svg>

                          <Switch
                            checked={darkMode}
                            onChange={setDarkmode}
                            className={`${
                              darkMode ? "bg-purple" : "bg-purple_hover"
                            }
          relative inline-flex h-[30] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${
                                darkMode ? "translate-x-6" : "translate-x-[1px]"
                              }
            pointer-events-none inline-block h-[17px] w-[17px]  transform self-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                          </Switch>

                          <svg
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                              fill="#828FA3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
