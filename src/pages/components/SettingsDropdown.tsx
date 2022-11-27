import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import { DeleteBoardModal } from "./navigation/DeleteBoardModal";
import { FaSignOutAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from "next/router";

export const SettingsDropdown = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const router = useRouter();

  function signedOut() {
    signOut();
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }
  return (
    <div className="text-right">
      {displayModal && <DeleteBoardModal setDisplayModal={setDisplayModal} />}

      <Menu as="div" className="relative inline-block text-left">
        <div className="">
          <Menu.Button className="inline-flex w-full justify-center rounded-md stroke-medium_gray px-1 text-sm font-medium text-black hover:bg-gray-200 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75  ">
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-2 ring-coal ring-opacity-5 focus:outline-none dark:divide-coal/60 dark:bg-dark_gray dark:ring-white dark:ring-opacity-10 ">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/account"}
                    className={`${
                      active ? "bg-purple text-white" : "text-medium_gray"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                  >
                    <MdModeEditOutline
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Edit Account
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Something
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setDisplayModal((prevState) => !prevState)}
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
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signedOut()}
                    className={`${
                      active ? "bg-purple text-white" : "text-medium_gray"
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
