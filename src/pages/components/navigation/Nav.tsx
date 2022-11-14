import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { AddBoardsModal } from "./AddBoardsModal";
import { BoardsDropdown } from "./BoardsDropdown";
import { SettingsDropdown } from "../SettingsDropdown";
import { AddTaskModal } from "./AddTaskModal";

export const Nav = () => {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  if (!sessionData) {
    return null;
  }
  return (
    <div>
      <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav className="mx-auto w-11/12">
        <div className="alig mx-auto flex max-w-[22.5rem] items-center justify-between py-3">
          <div className="flex items-center">
            <Link href={"/"} className="mr-3">
              <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
                <g fill="#635FC7" fillRule="evenodd">
                  <rect width="6" height="25" rx="2" />
                  <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                  <rect opacity=".5" x="18" width="6" height="25" rx="2" />
                </g>
              </svg>
            </Link>
            <BoardsDropdown />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen((prevState) => !prevState)}
              className="btn-primary-s mr-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>

            <SettingsDropdown />
          </div>
        </div>
      </nav>
    </div>
  );
};
