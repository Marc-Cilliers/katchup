import { useAuth } from "@/utils/hooks/useAuth";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  const { user } = useAuth();
  const userImage = user?.image;

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-zinc-900 justify-between">
      <div className="container flex flex-wrap items-start justify-start dark">
        <div className="flex flex-row justify-start dark">
          {userImage && (
            <Image
              src={userImage}
              width={50}
              height={50}
              alt="User profile picture"
            />
          )}
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-zinc-800 md:dark:bg-zinc-900 dark:border-zinc-700">
            <li>
              <NavButton text="Logout" onClick={() => signOut()} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

interface NavButtonProps {
  text: string;
  onClick: () => void;
}

const NavButton = ({ text, onClick }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
      aria-current="page"
    >
      {text}
    </button>
  );
};
