import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BoardsDropdown } from "../board/BoardsDropdown";
import { OptionsDropdown } from "../OptionsDropdown";
import { AddTaskModal } from "../tasks/AddTaskModal";
import { BsPlusLg } from "react-icons/bs";

interface Props {
  toggleSideBar: boolean;
  setToggleSideBar: (
    value: boolean | ((prevState: boolean) => boolean)
  ) => void;
}

export const Nav = ({ toggleSideBar, setToggleSideBar }: Props) => {
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

  if (!sessionData?.user) return null;

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

            <BoardsDropdown
              toggleSideBar={toggleSideBar}
              setToggleSideBar={setToggleSideBar}
              handleThemeSwitch={handleThemeSwitch}
              darkMode={darkMode}
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsOpen((prevState) => !prevState)}
              disabled={router.pathname === "/" ? true : false}
              className="btn-primary-s mr-1 flex items-center  disabled:pointer-events-none disabled:opacity-40"
            >
              <BsPlusLg className="h-3 w-3 sm:h-2 sm:w-2" />

              <span className="ml-1 hidden text-sm sm:inline-block">
                Add New Task
              </span>
            </button>

            <OptionsDropdown />
          </div>
        </div>
      </nav>
    </div>
  );
};
