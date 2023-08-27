import { FC, useState } from "react";
import { Link } from "react-router-dom";

const NavbarProfileSection: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <div>
      <button
        className="relative w-[40px] h-[40px] rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        <img
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          className="rounded-full"
        />
      </button>
      <div
        className={`${
          isOpened ? "z-10 opacity-100" : "-z-10 opacity-0"
        } transition-opacity duration-300 absolute right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            name@flowbite.com
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link
              to={"#"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={"#"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to={"#"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarProfileSection;
