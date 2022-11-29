import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { AddBoardsModal } from "./AddBoardsModal";
import { BoardsDropdown } from "./BoardsDropdown";
import { SettingsDropdown } from "../SettingsDropdown";
import { AddTaskModal } from "../Task/AddTaskModal";
import { useRouter } from "next/router";

export const Nav = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const handleThemeSwitch = () => setDarkMode((prevState) => !prevState);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (!sessionData) {
    return null;
  }

  return (
    <div className="sticky top-0 bg-white shadow-sm dark:bg-dark_gray">
      {isOpen && <AddTaskModal setIsOpen={setIsOpen} />}
      <nav className="mx-auto w-11/12 sm:mx-0">
        <div className="mx-auto flex max-w-[22.5rem] items-center justify-between py-3 sm:mx-0 sm:ml-6 sm:max-w-none">
          <div className="flex items-center">
            <Link href={"/"} className="mr-3 sm:flex sm:items-center ">
              <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
                <g fill="#635FC7" fillRule="evenodd">
                  <rect width="6" height="25" rx="2" />
                  <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                  <rect opacity=".5" x="18" width="6" height="25" rx="2" />
                </g>
              </svg>{" "}
              <span className=" ml-3 hidden h-full border-r border-lines_light px-4 text-2xl font-extrabold text-coal dark:border-lines dark:text-white sm:inline-block">
                kanban
              </span>
            </Link>

            {true && (
              <BoardsDropdown
                handleThemeSwitch={handleThemeSwitch}
                darkMode={darkMode}
              />
            )}
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsOpen((prevState) => !prevState)}
              disabled={router.pathname === "/" ? true : false}
              className="btn-primary-s mr-1 disabled:pointer-events-none disabled:opacity-40 sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 sm:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="hidden text-sm sm:inline-block">
                + {"  "}Add New Task
              </span>
            </button>
            {true && <SettingsDropdown />}
          </div>
        </div>
      </nav>
    </div>
  );
};
