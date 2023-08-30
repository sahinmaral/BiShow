import { FC, useCallback, useEffect, useState } from "react";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getAppState, setModalContent } from "../redux/app/appSlice";
import ModalContent from "../types/ModalContentType";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";

const TheatreShowroomFilterSection: FC = () => {
  const { activityFilter, activities } = useSelector(getAppState);

  const dispatch = useDispatch();

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

  const getNonDuplicatedArray = useCallback(
    (datas: string[]) => {
      const filteredFromDuplicatedItems = datas.filter((item, index, array) => {
        return array.indexOf(item) === index;
      });
      return filteredFromDuplicatedItems;
    },
    [activities]
  );

  const handleSetModalContent = (modalContent: ModalContent) => {
    dispatch(setModalContent(modalContent));

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "hidden";
  };

  return (
    <div
      className={`${
        isOpened ? "md:h-[140px] h-[80px] " : ""
      }bg-purple-heart-300 rounded-lg p-4 w-full mt-10`}
    >
      <div className="flex md:hidden justify-between py-3 pe-1">
        <h1 className="text-xl font-semibold">Filtreleme</h1>
        <button
          className="text-slate-800"
          onClick={() => setIsOpened(!isOpened)}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </div>
      <ul
        className={`${
          !isOpened || pageWidth > 768 ? "opacity-100" : "opacity-0 invisible"
        } transition-opacity duration-700 grid md:grid-rows-1 grid-rows-4 md:grid-cols-4 grid-cols-1 font-medium text-gray-900 bg-purple-heart-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      >
        <li className="px-4 py-3 w-full flex flex-col gap-5 border-r border-r-gray-400 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Şehir</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.location === undefined
                ? "Şehir"
                : activityFilter.location}
            </p>
          </div>
          <button
            className="bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center"
            onClick={() =>
              handleSetModalContent({
                title: "Şehir",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                datas: getNonDuplicatedArray(
                  [...activities]
                    .map((activity) => activity.tickets)
                    .reduce((result, arr) => result.concat(arr), [])
                    .map((activityTicket) => activityTicket.city)
                ),
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Ekle</span>
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 border-r border-r-gray-400 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Mekan</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.location === undefined
                ? "Mekan"
                : activityFilter.location}
            </p>
          </div>
          <button
            className="group bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center"
            onClick={() =>
              handleSetModalContent({
                title: "Mekan",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                datas: getNonDuplicatedArray(
                  [...activities]
                    .map((activity) => activity.tickets)
                    .reduce((result, arr) => result.concat(arr), [])
                    .map((activityTicket) => activityTicket.seances)
                    .reduce((result, arr) => result.concat(arr), [])
                    .map((seance) => seance.location.name)
                ),
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Ekle</span>
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 border-r border-r-gray-400 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Tür</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.genre === undefined
                ? "Tür"
                : activityFilter.genre}
            </p>
          </div>
          <button
            className="bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center"
            onClick={() =>
              handleSetModalContent({
                title: "Tür",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                datas: getNonDuplicatedArray(
                  [...activities].map((activity) => activity.genre)
                ),
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Ara</span>
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 group hover:cursor-pointer hover:bg-purple-heart-200">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Tarih</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.startingDate === undefined
                ? "Tarih"
                : activityFilter.startingDate.toISOString()}
            </p>
          </div>
          <button
            className="group bg-dolly-300 hover:bg-dolly-200 rounded-md py-2 w-full flex gap-4 justify-center items-center"
            onClick={() =>
              handleSetModalContent({
                title: "Tarih",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                //datas: [],
                datas: getNonDuplicatedArray(
                  [...activities]
                    .sort(
                      (a, b) =>
                        new Date(a.startingDate).getTime() -
                        new Date(b.startingDate).getTime()
                    )
                    .map((activity) =>
                      new Date(activity.startingDate).toLocaleDateString(
                        "tr-TR",
                        {
                          year: "numeric",
                          month: "long", // 'short' for abbreviated month, 'long' for full month name
                          day: "numeric",
                        }
                      )
                    )
                ),
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Ara</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TheatreShowroomFilterSection;
