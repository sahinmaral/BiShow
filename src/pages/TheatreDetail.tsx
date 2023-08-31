import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Activity from "../types/Activity";
import { getActivityById } from "../services/database/databaseService";
import { ActivitySeanceType } from "../types/ActivitiyTicketType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
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

const TheatreDetail: FC = () => {
  const { id } = useParams();

  const { fetchResultAtPage } = useSelector(getAppState);
  const dispatch = useDispatch();

  const [activityDetail, setActivityDetail] = useState<Activity | undefined>();

  const deadLineDateOfActivity = useMemo(() => {
    if (activityDetail !== undefined) {
      const concattedData = activityDetail?.tickets
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
    if (activityDetail !== undefined) {
      const concattedData = activityDetail.tickets.map((ticket) => ticket.city);

      const filteredFromDuplicatedItems = concattedData.filter(
        (item, index, array) => {
          return array.indexOf(item) === index;
        }
      );

      return filteredFromDuplicatedItems;
    }
  }, [activityDetail]);

  useEffect(() => {
    dispatch(setIsLoadingOfFetchResult(true));
    getActivityById(id!)
      .then((docSnap) => {
        if (docSnap.exists())
          setActivityDetail(mapActivityFromDocumentData(docSnap.data()));
      })
      .catch((error) => {
        dispatch(setErrorMessageOfFetchResult(error.message));
      })
      .finally(() => {
        dispatch(setIsLoadingOfFetchResult(false));
      });
  }, [id]);

  return (
    <Fragment>
      {fetchResultAtPage.isLoading && <Loading />}
      {fetchResultAtPage.errorMessage && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={fetchResultAtPage.errorMessage}
        />
      )}
      {!fetchResultAtPage.isLoading && activityDetail === undefined && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={`${id} ID ye sahip tiyatro bulunamadı.`}
        />
      )}
      {!fetchResultAtPage.isLoading && activityDetail !== undefined && (
        <Fragment>
          <div className="relative inline-block">
            <div className="absolute flex md:flex-row flex-col top-0 left-0 w-full h-full pointer-events-none bg-black bg-opacity-70">
              <img
                src={activityDetail.thumbnail}
                className="max-md:absolute top-5 max-md:left-1/2 max-md:-translate-x-1/2 rounded-lg scale-100 md:scale-75 md:w-fit w-[200px]"
              />

              <div className="flex flex-col max-md:items-center gap-3 md:mt-[3.5rem] mt-[320px] text-white">
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
                <p className="md:ms-4 ms-0">
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
                <p
                  className={`${
                    activityDetail.duration === null ? "hidden" : "flex"
                  } gap-3 items-center md:ms-4 ms-0`}
                >
                  <FontAwesomeIcon icon={faClock} />
                  <span>{activityDetail.duration}</span>
                </p>
                <p className="md:ms-4 ms-0">{activityDetail.genre}</p>
              </div>
            </div>
            <img
              className="block w-screen sm:h-[550px] md:h-auto h-[600px]"
              src="/theatre-detail-banner.jpg"
              alt="Image with Gray Overlay"
            />
          </div>
          <div className="container mx-auto flex flex-col gap-5">
            <TheatreDetailTabs description={activityDetail.description} />
            <TheatreTicketsSection
              tickets={activityDetail.tickets}
              activityName={activityDetail.name}
            />
            <SameGenreTheatreRecommendations genreName={activityDetail.genre} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TheatreDetail;
