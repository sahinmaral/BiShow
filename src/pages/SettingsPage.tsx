import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setModalContent } from "../redux/app/appSlice";
import ModalContentType from "../types/ModalContentType";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";
import { getAuthState } from "../redux/auth/authSlice";

const SettingsPage: FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(getAuthState);

  const handleSetModalContent = (modalContent: ModalContentType) => {
    dispatch(setModalContent(modalContent));

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "hidden";
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between border-b border-gray-400 py-5">
        <h1 className="text-4xl font-semibold">Ayarlar</h1>

        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                Anasayfa
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCircle} className="w-[5px]" />
                <Link
                  to={"/ayarlar"}
                  className="ml-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Ayarlar
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full mt-5 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <button
          onClick={() => {
            handleSetModalContent({
              title: "Tema",
              isOpened: true,
              modalType: ModalContentTypeEnum.ThemeChange,
              data: user !== null && user.theme !== undefined ? user.theme : "",
            });
          }}
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Temayı değiştir
        </button>
        <button
          onClick={() => {
            handleSetModalContent({
              title: "Şifre güncelleme",
              isOpened: true,
              modalType: ModalContentTypeEnum.ChangePassword,
              data: "",
            });
          }}
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Şifreyi değiştir
        </button>
        <button
          onClick={() => {}}
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          Profil fotoğrafını değiştir
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
