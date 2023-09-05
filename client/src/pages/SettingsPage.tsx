import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setModalContent } from "../redux/app/appSlice";
import ModalContentType from "../types/ModalContentType";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";
import { getAuthState } from "../redux/auth/authSlice";
import { Helmet } from "react-helmet-async";
import constants from "../assets/constants";

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
      <Helmet>
        <title>Ayarlar - {constants.APP_MAIN_TITLE}</title>
      </Helmet>
      <div className="flex justify-between border-b border-gray-400 py-5">
        <h1 className="text-4xl font-semibold dark:text-white">Ayarlar</h1>

        <nav className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-base font-medium text-gray-700  hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
              >
                Anasayfa
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="w-[5px] dark:text-white text-gray-700"
                />
                <Link
                  to={"/ayarlar"}
                  className="ml-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-white dark:hover:text-blue-600"
                >
                  Ayarlar
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full mt-5 text-lg font-medium  bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">
        <button
          onClick={() => {
            handleSetModalContent({
              title: "Tema",
              isOpened: true,
              modalType: ModalContentTypeEnum.ThemeChange,
              data: user !== null && user.theme !== undefined ? user.theme : "",
            });
          }}
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white text-gray-900 dark:text-white"
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
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white text-gray-900 dark:text-white"
        >
          Şifreyi değiştir
        </button>
        {/* <button
          onClick={() => {}}
          className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          TODO: Profil fotografi guncelleme secenegi ekle
          Profil fotoğrafını değiştir
        </button> */}
      </div>
    </div>
  );
};

export default SettingsPage;
