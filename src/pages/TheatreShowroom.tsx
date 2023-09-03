import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TheatreShowroomFilterSection from "../components/TheatreShowroomFilterSection";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import {
  getActivities,
  loadMoreActivities,
} from "../services/database/databaseService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppState,
  setActivities,
  setActivityFilter,
  setErrorMessageOfFetchResult,
  setIsLoadingOfFetchResult,
} from "../redux/app/appSlice";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import CustomAlert from "../components/CustomAlert";
import AlertTypeEnum from "../enums/AlertTypeEnum";
import TheatreShowroomGridSection from "../components/TheatreShowroomGridSection";
import { Helmet } from "react-helmet-async";
import constants from "../assets/constants";
import TheatreShowroomLoadingGridSection from "../components/TheatreShowroomLoadingGridSection";

const TheatreShowroom: FC = () => {
  const state = useSelector(getAppState);

  const [lastVisibleItem, setLastVisibleItem] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const dispatch = useDispatch();

  const filteredActivities = useMemo(() => {
    const { type, genre, location, startingDate, city } = state.activityFilter;

    let filteredData = state.activities;
    if (type !== undefined)
      filteredData = filteredData.filter((item) => item.activityType === type);

    if (genre !== undefined)
      filteredData = filteredData.filter((item) => item.genre === genre);

    if (location !== undefined) {
      filteredData = filteredData.filter(
        (item) =>
          item.tickets.filter(
            (ticket) =>
              ticket.seances.filter(
                (seance) => seance.location.name === location
              ).length > 0
          ).length > 0
      );
    }

    if (city !== undefined) {
      filteredData = filteredData.filter(
        (item) =>
          item.tickets.filter((ticket) => ticket.city === city).length > 0
      );
    }

    //TODO : Lokalizasyon yapilacagi zaman buradaki kod refactor edilmesi gerekir cunku sadece Turkce date donusturme yapiliyor
    if (startingDate !== undefined) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.startingDate).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) === startingDate.toString()
      );
    }

    return filteredData;
  }, [state.activityFilter, state.activities]);

  const loadMore = () => {
    loadMoreActivities(lastVisibleItem!).then((result) => {
      setLastVisibleItem(result.lastVisibleItem);
      dispatch(setActivities([...state.activities, ...result.activities]));
    });
  };

  const loadMoreByScrollEvent = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMore();
    }
  };

  useEffect(() => {
    if (lastVisibleItem !== undefined) {
      window.addEventListener("scroll", loadMoreByScrollEvent);
    }

    return () => {
      window.removeEventListener("scroll", loadMoreByScrollEvent);
    };
  }, [lastVisibleItem]);

  useEffect(() => {
    dispatch(setIsLoadingOfFetchResult(true));

    getActivities()
      .then((result) => {
        setLastVisibleItem(result.lastVisibleItem);
        dispatch(setActivities(result.activities));
        dispatch(setActivityFilter({ type: "Tiyatro" }));
      })
      .catch((error) => {
        dispatch(setErrorMessageOfFetchResult(error.message));
      })
      .finally(() => {
        dispatch(setIsLoadingOfFetchResult(false));
      });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Tiyatrolar - {constants.APP_MAIN_TITLE}</title>
      </Helmet>
      {state.fetchResultAtPage.errorMessage && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={state.fetchResultAtPage.errorMessage}
        />
      )}
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <div className="flex justify-between border-b border-gray-400 py-5">
          <h1 className="text-4xl font-semibold dark:text-white">Tiyatro</h1>

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
                    to={"/tiyatro"}
                    className="ml-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-white dark:hover:text-blue-600"
                  >
                    Tiyatro
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <TheatreShowroomFilterSection
          isLoading={state.fetchResultAtPage.isLoading}
        />

        {state.fetchResultAtPage.isLoading ? (
          <TheatreShowroomLoadingGridSection />
        ) : (
          <TheatreShowroomGridSection filteredActivities={filteredActivities} />
        )}
      </div>
    </Fragment>
  );
};

export default TheatreShowroom;
