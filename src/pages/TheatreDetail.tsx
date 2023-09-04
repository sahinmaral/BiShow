import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Activity from "../types/Activity";
import { getActivityById } from "../services/database/databaseService";
import { ActivitySeanceType } from "../types/ActivitiyTicketType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import TheatreDetailTabs from "../components/TheatreDetailTabs";
import TheatreTicketsSection from "../components/TheatreTicketsSection";
import SameGenreTheatreRecommendations from "../components/SameGenreTheatreRecommendations";
import {
  getAppState,
  setErrorMessageOfFetchResult,
  setIsLoadingOfFetchResult,
} from "../redux/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { mapActivityFromDocumentData } from "../helpers/firebaseHelper";
import Loading from "./Loading";
import CustomAlert from "../components/CustomAlert";
import AlertTypeEnum from "../enums/AlertTypeEnum";
import { Helmet } from "react-helmet-async";
import constants from "../assets/constants";

const TheatreDetail: FC = () => {
  const { id } = useParams();

  const { fetchResultAtPage } = useSelector(getAppState);
  const dispatch = useDispatch();

  const [activityDetail, setActivityDetail] = useState<Activity | null>(null);
  const [initialRender, setInitialRender] = useState(true);

  const deadLineDateOfActivity = useMemo(() => {
    if (activityDetail) {
      const concattedData = activityDetail.tickets
        .map((ticket) => ticket.seances)
        .reduce((result, arr) => result.concat(arr), [])
        .sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );

      const filteredFromDuplicatedItems = concattedData.filter(
        (item, index, array) => {
          return array.indexOf(item) === index;
        }
      );

      const lastEndDate = (
        filteredFromDuplicatedItems as ActivitySeanceType[]
      )[0].endDate;
      return new Date(lastEndDate);
    }
  }, [activityDetail]);

  const locationsOfActivity = useMemo(() => {
    if (activityDetail) {
      const concattedData = activityDetail.tickets.map((ticket) => ticket.city);

      const filteredFromDuplicatedItems = concattedData.filter(
        (item, index, array) => {
          return array.indexOf(item) === index;
        }
      );

      return filteredFromDuplicatedItems;
    }
  }, [activityDetail]);

  const countOfSeancesOfActivityThatIsNotOutdated = useMemo(() => {
    if (activityDetail) {
      const concattedData = activityDetail.tickets
        .map((ticket) => ticket.seances)
        .reduce((result, arr) => result.concat(arr), [])
        .filter((seance) => new Date(seance.startDate).getTime() > Date.now());

      return concattedData.length;
    }
  }, [activityDetail]);

  useEffect(() => {
    dispatch(setIsLoadingOfFetchResult(true));
    getActivityById(id!)
      .then((docSnap) => {
        if (docSnap.exists())
          setActivityDetail(mapActivityFromDocumentData(docSnap.data()));
        else setActivityDetail(null);
      })
      .catch((error) => {
        dispatch(setErrorMessageOfFetchResult(error.message));
      })
      .finally(() => {
        dispatch(setIsLoadingOfFetchResult(false));
        setInitialRender(false);
      });
  }, [id]);

  return (
    <Fragment>
      {(fetchResultAtPage.isLoading || initialRender) && <Loading />}
      {!fetchResultAtPage.isLoading && fetchResultAtPage.errorMessage && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={fetchResultAtPage.errorMessage}
        />
      )}
      {!initialRender &&
        !fetchResultAtPage.isLoading &&
        !fetchResultAtPage.errorMessage &&
        !activityDetail && (
          <CustomAlert
            alertType={AlertTypeEnum.Danger}
            message={`${id} ID ye sahip tiyatro bulunamadı.`}
          />
        )}
      {!initialRender && !fetchResultAtPage.isLoading && activityDetail && (
        <Fragment>
          <Helmet>
            <title>
              {activityDetail.name} - {constants.APP_MAIN_TITLE}
            </title>
          </Helmet>
          {/* FIXME: Activity uzerinden herhangi bir sey secmeye calisildiginda arkadaki resmi seciyor. */}
          <div className="relative inline-block">
            <div className="absolute flex md:flex-row flex-col top-0 left-0 w-full h-full pointer-events-none bg-black bg-opacity-70">
              <img
                src={activityDetail.thumbnail}
                className="max-md:absolute md:top-5 top-16 max-md:left-1/2 max-md:-translate-x-1/2 rounded-lg scale-100 md:scale-75 md:w-fit w-[200px]"
              />

              <div className="flex flex-col max-md:items-center gap-3 md:mt-[3.5rem] mt-[350px] text-white">
                <h1 className="max-sm:text-center text-3xl font-semibold">
                  {activityDetail.name}
                </h1>
                <p className="max-sm:text-center">
                  {locationsOfActivity?.map((location, index) => (
                    <span key={uuidv4()}>
                      {location}
                      {index < locationsOfActivity.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendar} />
                  <p className="ms-4">
                    <span>
                      {new Date(activityDetail.startingDate).toLocaleDateString(
                        "tr-TR",
                        {
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>{" "}
                    -{" "}
                    <span>
                      {deadLineDateOfActivity?.toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
                <p
                  className={`${
                    activityDetail.duration === null ? "hidden" : "flex"
                  } gap-3 items-center`}
                >
                  <FontAwesomeIcon icon={faClock} />
                  <span>{activityDetail.duration}</span>
                </p>
                <p>{activityDetail.genre}</p>
                {countOfSeancesOfActivityThatIsNotOutdated === 0 && (
                  <div className="capitalize text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Bu etkinlik gerçekleşti
                  </div>
                )}
              </div>
            </div>
            <img
              className="block w-screen md:h-auto h-[700px]"
              src="/theatre-detail-banner.jpg"
              alt="Image with Gray Overlay"
            />
          </div>
          <div className="container mx-auto flex flex-col gap-5">
            <TheatreDetailTabs
              activityDetail={activityDetail}
              setActivityDetail={setActivityDetail}
            />
            {countOfSeancesOfActivityThatIsNotOutdated !== 0 && (
              <TheatreTicketsSection activity={activityDetail} />
            )}
            <SameGenreTheatreRecommendations genreName={activityDetail.genre} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TheatreDetail;
