import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TheatreShowroomFilterSection from "../components/TheatreShowroomFilterSection";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from "uuid";
import {
  getActivities,
  loadMoreActivities,
} from "../services/database/databaseService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppState,
  setActivities,
  setActivityFilter,
} from "../redux/app/appSlice";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

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
    getActivities().then((result) => {
      setLastVisibleItem(result.lastVisibleItem);
      dispatch(setActivities(result.activities));
      dispatch(setActivityFilter({ type: "Tiyatro" }));
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between border-b border-gray-400 py-5">
        <h1 className="text-4xl font-semibold">Tiyatro</h1>

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
                  to={"/theatres"}
                  className="ml-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Tiyatro
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <TheatreShowroomFilterSection />

      <div className="grid md:grid-cols-4 grid-cols-2 mt-5 gap-5">
        {filteredActivities.map((theatre) => {
          return (
            <div
              className="max-w-sm bg-white rounded-lg dark:bg-gray-800"
              key={uuidv4()}
            >
              <a href="#">
                <img className="rounded-lg" src={theatre.thumbnail} alt="" />
              </a>
              <div className="py-5">
                <Link to={`/theatres/${theatre.id}`}>
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {theatre.name}
                  </h5>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TheatreShowroom;
