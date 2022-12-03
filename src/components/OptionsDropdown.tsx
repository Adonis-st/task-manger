import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import { BoardModals } from "./board/BoardModals";
import { FaSignOutAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { MdModeEditOutline, MdOutlineAccountCircle } from "react-icons/md";

export const OptionsDropdown = () => {
  const [displayModal, setDisplayModal] = useState({
    editBoard: false,
    deleteBoard: false,
  });

  const { editBoard, deleteBoard } = displayModal;

  const closeModal = () => {
    setDisplayModal((prevState) => ({
      ...prevState,
      editBoard: false,
      deleteBoard: false,
    }));
    0;
  };
  const router = useRouter();

  const signedOut = () => {
    router.push("/");
    signOut();
  };

  return (
    <div className="text-right">
      <BoardModals
        editBoard={editBoard}
        deleteBoard={deleteBoard}
        closeModal={closeModal}
      />

      <Menu as="div" className="relative inline-block text-left">
        <div className="">
          <Menu.Button className="inline-flex w-full justify-center rounded-md stroke-medium_gray px-1 text-sm font-medium text-black hover:bg-gray-200 hover:bg-opacity-30 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="h-7 w-7 pt-1 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -right-6 mt-3 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-2 ring-coal ring-opacity-5 dark:divide-coal/60  dark:bg-dark_gray dark:ring-white dark:ring-opacity-10 sm:w-44">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setDisplayModal((prevState) => ({
                        ...prevState,
                        editBoard: true,
                      }));
                    }}
                    className={`${
                      active ? "bg-purple text-white" : "text-medium_gray"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                  >
                    <MdModeEditOutline
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Edit Board
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setDisplayModal((prevState) => ({
                        ...prevState,
                        deleteBoard: true,
                      }));
                    }}
                    className={`${
                      active ? "bg-danger text-white " : "text-medium_gray"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold `}
                  >
                    <RiDeleteBin5Line
                      className="mr-2 h-5 w-5 "
                      aria-hidden="true"
                    />
                    Delete Board
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/account"}
                    className={`${
                      active ? "bg-purple text-white" : "text-medium_gray"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                  >
                    <MdOutlineAccountCircle
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Account
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signedOut()}
                    className={`${
                      active ? "bg-danger text-white" : "text-medium_gray"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                  >
                    <FaSignOutAlt
                      className="mr-2 h-5 w-5 "
                      aria-hidden="true"
                    />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
