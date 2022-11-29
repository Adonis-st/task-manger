import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Popover, Transition, Switch } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AddBoardsModal } from "./AddBoardsModal";
import { ProjectData } from "./ProjectData";

export const BoardsDropdown = ({ handleThemeSwitch, darkMode }: any) => {
  const router = useRouter();
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const boardId = router.query.boardId as string;
  const [showSidebar, setShowSidebar] = useState(true);
  const { data: singleBoard } = trpc.boards.getSingleBoard.useQuery({
    boardId,
  });

  const { data: getAllBoards, refetch } = trpc.boards.getAllBoards.useQuery();

  const latestBoard = getAllBoards?.[getAllBoards.length - 1]?.id;
  // console.log(latestBoard);
  // console.log(`${isRefetching} is refetching`);
  // console.log(`${isSuccess} is sucess`);
  // if (isRefetching) {
  //   setTimeout(() => {
  //     router.push(`/boards/${latestBoard}`);
  //   }, 1000);
  // }

  // useEffect(() => {
  //   return () => {
  //     console.log(getAllBoards?.length);
  //   };
  // }, [getAllBoards?.length]);

  // useEffect(() => {
  // const latestBoard = getAllBoards?.[getAllBoards.length - 1]?.id;
  // console.log(latestBoard);

  // router.push(`/boards/${latestBoard}`);
  //   if (true) {
  //     return () => {
  //       router.push(`/boards/${latestBoard?.id}`);
  //       console.log("Yessit this isf sjfjls lkfsjlk");
  //     };
  //   }
  // }, [isFetched]);

  return (
    <div className="top-16 w-full max-w-sm  sm:px-3">
      {displayModal && <AddBoardsModal setDisplayModal={setDisplayModal} />}
      {showSidebar && (
        <div className="fixed top-0 left-0 z-[1] hidden h-full w-[260px] overflow-x-hidden border-r border-lines_light bg-white py-5 dark:border-lines dark:bg-dark_gray sm:block">
          <div className="flex flex-col gap-y-4 pr-8">
            <Link href={"/"} className=" ml-3 mb-5 flex  items-center">
              <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
                <g fill="#635FC7" fillRule="evenodd">
                  <rect width="6" height="25" rx="2" />
                  <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                  <rect opacity=".5" x="18" width="6" height="25" rx="2" />
                </g>
              </svg>{" "}
              <span className="ml-3 hidden text-2xl font-extrabold text-coal dark:text-white sm:inline-block">
                kanban
              </span>
            </Link>

            <ProjectData
              singleBoard={singleBoard}
              getAllBoards={getAllBoards}
            />
            <div className="group flex items-center">
              <div className="ml-[1.1rem]">
                <svg
                  className="fill-purple group-hover:fill-medium_gray"
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
              <div></div>
            </div>
          </div>

          <div className="absolute  bottom-[7%] left-0 w-full">
            <div
              onClick={handleThemeSwitch}
              className="
              mx-auto
               mb-5 w-11/12 cursor-pointer bg-white dark:bg-dark_gray"
            >
              <div className="flow-root rounded-md bg-light_gray px-2 py-3 transition duration-150 ease-in-out dark:bg-very_dark_gray">
                <div className="flex items-center justify-center">
                  <div className="flex w-[70%] items-center justify-between">
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
                      className={`${darkMode ? "bg-purple" : "bg-purple_hover"}
relative mx-auto inline-flex h-[30] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out `}
                    >
                      <span
                        className={`${
                          darkMode ? "translate-x-6" : "translate-x-[1px]"
                        }
pointer-events-none inline-block h-[17px] w-[17px] transform self-center rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
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

            <div>
              <button
                onClick={() => setShowSidebar((prevState) => !prevState)}
                className="  ml-5 flex items-center self-center rounded-full p-1 hover:bg-gray-100"
              >
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                    fill="#828FA3"
                  />
                </svg>
                <span className="heading-m ml-1 text-medium_gray">
                  {" "}
                  Hide Sidebar
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {!showSidebar && (
        <button
          className="fixed bottom-[5%] left-0 z-[1] hidden  rounded-r-full bg-purple py-4 pl-3 pr-4 hover:bg-purple_hover sm:block"
          onClick={() => setShowSidebar((prevState) => !prevState)}
        >
          <svg
            width="16"
            height="11"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
              fill="#fff"
            />
          </svg>
        </button>
      )}
      <div className={`${showSidebar ? "ml-24" : " ml-3 "}  hidden sm:block `}>
        <h1 className="heading-l min-w-[120px] max-w-fit dark:text-white">
          {singleBoard?.title ? singleBoard?.title : " + Create new Board"}
        </h1>
      </div>

      <Popover className="relative sm:hidden">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center hover:text-opacity-100`}
            >
              <h1 className="heading-l min-w-[120px] max-w-fit dark:text-white">
                {singleBoard?.title
                  ? singleBoard?.title
                  : " + Create new Board"}
              </h1>
              <ChevronDownIcon
                className={`${open ? "rotate-180 transform" : "text-opacity-70"}
                  ml-1 h-5 w-5 text-purple transition duration-150 ease-in-out group-hover:text-opacity-80`}
              />
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 bg-black opacity-60 " />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-[70%] z-10 mt-6 w-[85vw] max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                  <div className="relative flex flex-col gap-y-4 bg-white py-5 pr-8 dark:bg-dark_gray lg:grid-cols-2">
                    {/* <ProjectData /> */}

                    <div className="group flex items-center">
                      <div className="ml-[1.1rem]">
                        <svg
                          className="fill-purple group-hover:fill-medium_gray"
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
                    </div>

                    <div className="bg-white p-4 dark:bg-dark_gray">
                      <div className="flow-root rounded-md bg-light_gray  px-2 py-4 transition duration-150 ease-in-out dark:bg-very_dark_gray">
                        <div className="flex items-center justify-center">
                          <div className="flex w-1/2 items-center justify-between">
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
                              onChange={handleThemeSwitch}
                              className={`${
                                darkMode ? "bg-purple" : "bg-purple_hover"
                              }
relative mx-auto inline-flex h-[30] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 `}
                            >
                              <span
                                className={`${
                                  darkMode
                                    ? "translate-x-6"
                                    : "translate-x-[1px]"
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
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
