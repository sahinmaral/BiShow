import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarMenuLinks: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageWidth]);

  return (
    <Fragment>
      <ul
        className={`${
          isOpened || pageWidth > 640 ? "opacity-100 z-10" : "opacity-0 -z-10"
        } flex transition-opacity duration-300 sm:border-none max-sm:absolute max-sm:text-center max-sm:left-0 max-sm:top-[80px] max-sm:w-full  sm:flex-row flex-col sm:gap-5 gap-0 list-none`}
      >
        <Link to={"/"}>
          <li className="block py-3 bg-white sm:border-none border-b border-gray-200 hover:cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Keşfet
          </li>
        </Link>
        <Link to={"/"}>
          <li className="block py-3 bg-white sm:border-none border-b border-gray-200 hover:cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            Biletlerim
          </li>
        </Link>
      </ul>
      <button
        className="inline-flex sm:hidden items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setIsOpened(!isOpened)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </Fragment>
  );
};

export default NavbarMenuLinks;
