import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { faBars, faCircleNotch, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppState,
  setActivityFilter,
  setModalContent,
} from "../redux/app/appSlice";
import ModalContentType from "../types/ModalContentType";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";

type TheatreShowroomFilterSectionProps = {
  isLoading: boolean;
};

const TheatreShowroomFilterSection: FC<TheatreShowroomFilterSectionProps> = ({
  isLoading,
}) => {
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

  const mappedCountryOfActivities = useMemo(() => {
    return [...activities]
      .map((activity) => activity.tickets)
      .reduce((result, arr) => result.concat(arr), [])
      .map((activityTicket) => activityTicket.city);
  }, [activities]);

  const mappedLocationOfActivities = useMemo(() => {
    return [...activities]
      .map((activity) => activity.tickets)
      .reduce((result, arr) => result.concat(arr), [])
      .map((activityTicket) => activityTicket.seances)
      .reduce((result, arr) => result.concat(arr), [])
      .map((seance) => seance.location.name);
  }, [activities]);

  const mappedGenreOfActivities = useMemo(() => {
    return [...activities].map((activity) => activity.genre);
  }, [activities]);

  const mappedDateOfActivities = useMemo(() => {
    //TODO : Lokalizasyon yapilacagi zaman buradaki kod refactor edilmesi gerekir cunku sadece Turkce date donusturme yapiliyor
    return [...activities]
      .sort(
        (a, b) =>
          new Date(a.startingDate).getTime() -
          new Date(b.startingDate).getTime()
      )
      .map((activity) =>
        new Date(activity.startingDate).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long", // 'short' for abbreviated month, 'long' for full month name
          day: "numeric",
        })
      );
  }, [activities]);

  const handleSetModalContent = (modalContent: ModalContentType) => {
    dispatch(setModalContent(modalContent));

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "hidden";
  };

  const clearActivityFilter = (byWhat: string): void => {
    const mapOfActivityFilter = new Map([
      ["Şehir", "city"],
      ["Mekan", "location"],
      ["Tür", "genre"],
      ["Tarih", "startingDate"],
    ]);
    const keyOfActivityFilter = mapOfActivityFilter.get(byWhat)!;

    dispatch(
      setActivityFilter({ ...activityFilter, [keyOfActivityFilter]: undefined })
    );
  };

  return (
    <div
      className={`${
        isOpened ? "md:h-[140px] h-[80px] " : ""
      }bg-purple-heart-300 dark:bg-transparent rounded-lg w-full mt-10`}
    >
      <div className="flex md:hidden justify-end py-3 pe-1">
        <button
          className="text-slate-800 hover:text-slate-600 dark:text-white dark:hover:text-gray-400"
          onClick={() => setIsOpened(!isOpened)}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </div>
      {/* FIXME : Tema yuklenirken arkaplan yuklendikten sonra yazilarin rengi degisiyor */}
      <ul
        className={`${
          !isOpened || pageWidth > 768 ? "opacity-100" : "opacity-0 invisible"
        } transition-opacity duration-700 grid md:grid-rows-1 grid-rows-4 md:grid-cols-4 grid-cols-1 font-medium text-gray-900 bg-purple-heart-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      >
        <li className="px-4 py-3 w-full flex flex-col gap-5 group hover:cursor-pointer hover:bg-purple-heart-200 dark:hover:bg-gray-800">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Şehir</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.city === undefined
                ? "Şehir"
                : activityFilter.city}
            </p>
            {activityFilter.city !== undefined && (
              <button
                className="hidden group-hover:block hover:text-red-700"
                onClick={() => clearActivityFilter("Şehir")}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </div>
          <button
            disabled={isLoading}
            className="bg-dolly-300 hover:bg-dolly-200 dark:text-black font-bold rounded-md py-2 w-full flex gap-4 justify-center items-center"
            onClick={() =>
              handleSetModalContent({
                title: "Şehir",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                data: JSON.stringify(
                  getNonDuplicatedArray(mappedCountryOfActivities)
                ),
              })
            }
          >
            {isLoading ? (
              <Fragment>
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </Fragment>
            ) : (
              <Fragment>
                <FontAwesomeIcon icon={faPlus} />
                <span>Ekle</span>
              </Fragment>
            )}
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 group hover:cursor-pointer hover:bg-purple-heart-200 dark:hover:bg-gray-800">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Mekan</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.location === undefined
                ? "Mekan"
                : activityFilter.location}
            </p>
            {activityFilter.location !== undefined && (
              <button
                className="hidden group-hover:block hover:text-red-700"
                onClick={() => clearActivityFilter("Mekan")}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </div>
          <button
            className="group bg-dolly-300 hover:bg-dolly-200 dark:text-black font-bold rounded-md py-2 w-full flex gap-4 justify-center items-center"
            disabled={isLoading}
            onClick={() =>
              handleSetModalContent({
                title: "Mekan",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                data: JSON.stringify(
                  getNonDuplicatedArray(mappedLocationOfActivities)
                ),
              })
            }
          >
            {isLoading ? (
              <Fragment>
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </Fragment>
            ) : (
              <Fragment>
                <FontAwesomeIcon icon={faPlus} />
                <span>Ekle</span>
              </Fragment>
            )}
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 group hover:cursor-pointer hover:bg-purple-heart-200 dark:hover:bg-gray-800">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Tür</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.genre === undefined
                ? "Tür"
                : activityFilter.genre}
            </p>
            {activityFilter.genre !== undefined && (
              <button
                className="hidden group-hover:block hover:text-red-700"
                onClick={() => clearActivityFilter("Tür")}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </div>
          <button
            className="bg-dolly-300 hover:bg-dolly-200 dark:text-black font-bold rounded-md py-2 w-full flex gap-4 justify-center items-center"
            disabled={isLoading}
            onClick={() =>
              handleSetModalContent({
                title: "Tür",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                data: JSON.stringify(
                  getNonDuplicatedArray(mappedGenreOfActivities)
                ),
              })
            }
          >
            {isLoading ? (
              <Fragment>
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </Fragment>
            ) : (
              <Fragment>
                <FontAwesomeIcon icon={faPlus} />
                <span>Ekle</span>
              </Fragment>
            )}
          </button>
        </li>
        <li className="px-4 py-3 w-full flex flex-col gap-5 group hover:cursor-pointer hover:bg-purple-heart-200 dark:hover:bg-gray-800">
          <div className="flex justify-between">
            <p className="group-hover:hidden">Tarih</p>{" "}
            <p className="hidden group-hover:block">
              {activityFilter.startingDate === undefined
                ? "Tarih"
                : activityFilter.startingDate.toString()}
            </p>
            {activityFilter.startingDate !== undefined && (
              <button
                className="hidden group-hover:block hover:text-red-700"
                onClick={() => clearActivityFilter("Tarih")}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            )}
          </div>
          <button
            className="group bg-dolly-300 hover:bg-dolly-200 dark:text-black font-bold rounded-md py-2 w-full flex gap-4 justify-center items-center"
            disabled={isLoading}
            onClick={() =>
              handleSetModalContent({
                title: "Tarih",
                isOpened: true,
                modalType: ModalContentTypeEnum.FilterActivity,
                data: JSON.stringify(
                  getNonDuplicatedArray(mappedDateOfActivities)
                ),
              })
            }
          >
            {isLoading ? (
              <Fragment>
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </Fragment>
            ) : (
              <Fragment>
                <FontAwesomeIcon icon={faPlus} />
                <span>Ekle</span>
              </Fragment>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TheatreShowroomFilterSection;
