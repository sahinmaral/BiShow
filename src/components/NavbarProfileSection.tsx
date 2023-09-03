import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthState } from "../redux/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logOutUser } from "../services/auth/authService";
import { useToaster } from "../context/ToasterProvider";

const NavbarProfileSection: FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { setSuccessWithMessage } = useToaster();
  const { user } = useSelector(getAuthState);

  const logOut = () => {
    logOutUser().then(() => {
      setSuccessWithMessage("Görüşmek üzere");
      setIsOpened(false);
    });
  };

  return (
    <div>
      <button
        className="relative w-[40px] h-[40px] rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 border border-gray-300 dark:hover:border-cornflower-blue-600 hover:border-cornflower-blue-600"
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        {user !== null ? (
          user.photoUrl.length !== 0 ? (
            <img src={user.photoUrl} className="rounded-full" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="dark:text-white" />
          )
        ) : (
          <FontAwesomeIcon icon={faUser} className="dark:text-white" />
        )}
      </button>

      {user === null ? (
        <div
          className={`${
            isOpened ? "z-10 opacity-100" : "-z-10 opacity-0"
          } transition-opacity duration-300 absolute right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                to={"/giris-yap"}
                onClick={() => setIsOpened(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Giriş Yap
              </Link>
            </li>
            <li>
              <Link
                to={"/kayit-ol"}
                onClick={() => setIsOpened(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Kaydol
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div
          className={`${
            isOpened ? "z-10 opacity-100" : "-z-10 opacity-0"
          } transition-opacity duration-300 absolute right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <div className="px-4 py-3 hover:cursor-default">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {user.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                to={"/satin-aldigim-biletler"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Satın aldığım biletler
              </Link>
            </li>
            <li>
              <Link
                to={"/ayarlar"}
                onClick={() => {
                  setIsOpened(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Ayarlar
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logOut();
                }}
                className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Çıkış yap
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarProfileSection;
