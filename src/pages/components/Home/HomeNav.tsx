import Link from "next/link";
import { useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { signIn } from "next-auth/react";

export const HomeNav = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  return (
    <nav>
      <div className="mx-auto flex w-11/12 items-center justify-between py-2">
        <Link href={"/"} className="flex items-center ">
          <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
            <g fill="#635FC7" fillRule="evenodd">
              <rect width="6" height="25" rx="2" />
              <rect opacity=".75" x="9" width="6" height="25" rx="2" />
              <rect opacity=".5" x="18" width="6" height="25" rx="2" />
            </g>
          </svg>
          <span className="ml-2 h-full text-xl font-semibold  text-coal">
            kanban
          </span>
        </Link>

        <button
          onClick={() => setHamburgerMenu((prevState) => !prevState)}
          className=""
        >
          {hamburgerMenu ? (
            <MdMenuOpen className="h-8 w-8" />
          ) : (
            <MdMenu className="h-8 w-8" />
          )}
        </button>
      </div>
      {hamburgerMenu && (
        <div className="flex flex-col">
          <Link href={"/pricing"}> Pricing</Link>
          <button
            onClick={() => signIn()}
            className="btn-primary-s mx-auto w-10/12"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};
