import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ActivitySavePopover from "./ActivitySavePopover";
import {
  getBoughtedTicketOfUserByActivityId,
  saveBoughtedTicketOfUser,
} from "../services/database/databaseService";
import { useSelector } from "react-redux";
import { getAuthState } from "../redux/auth/authSlice";
import Activity from "../types/Activity";
import { useToaster } from "../context/ToasterProvider";
import BoughtTicketType from "../types/BoughtTicketType";
import { mapBoughtTicketFromDocumentData } from "../helpers/firebaseHelper";

type TheatreTicketsSectionProps = {
  activity: Activity;
};

const TheatreTicketsSection: FC<TheatreTicketsSectionProps> = ({
  activity,
}) => {
  const [focusedSeanceUrl, setFocusedSeanceUrl] = useState<string>("");

  const { setSuccessWithMessage, setDangerWithMessage } = useToaster();

  const { user } = useSelector(getAuthState);

  const [boughtedTickets, setBoughtedTickets] = useState<BoughtTicketType[]>(
    []
  );

  useEffect(() => {
    if (user !== null) {
      getBoughtedTicketOfUserByActivityId(user.id, activity.id).then(
        (result) => {
          result.docs.forEach((doc) => {
            setBoughtedTickets([
              ...boughtedTickets,
              mapBoughtTicketFromDocumentData(doc.data()),
            ]);
          });
        }
      );
    }
  }, []);

  const getSeanceBoughtState = useCallback(
    (seanceId: string) => {
      return (
        boughtedTickets.filter((ticket) => ticket.seanceId === seanceId)
          .length !== 0
      );
    },
    [boughtedTickets]
  );

  const clearFocusedSeanceUrl = (): void => {
    setFocusedSeanceUrl("");
  };

  const saveFocusedSeanceUrl = (seanceId: string) => {
    if (user === null) {
      setDangerWithMessage("Seansı kaydetmeniz için giriş yapmanız gerekiyor");
    } else {
      saveBoughtedTicketOfUser({
        userId: user.id,
        activityId: activity.id,
        seanceId: seanceId,
      }).then(() => {
        setSuccessWithMessage("Seansınızı başarılı bir şekilde kaydettiniz");
        clearFocusedSeanceUrl();
      });
    }
  };

  const filteredTickets = useMemo(() => {

    activity.tickets.forEach((ticket) => {

      ticket.seances = ticket.seances.filter(
        (seance) => (new Date(seance.startDate) > new Date(Date.now()) )
      );
    });

    return activity.tickets
  }, [activity]);

  return (
    <Fragment>
      <h1 className="text-2xl font-semibold dark:text-white">
        {activity.name} Biletleri ve Fiyatları
      </h1>

      {filteredTickets.map((ticket) => {
        return (
          <div className="rounded-lg w-full shadow-lg p-4" key={uuidv4()}>
            <h2 className="text-2xl font-semibold dark:text-white">
              {ticket.city}
            </h2>
            <h4 className="uppercase font-normal dark:text-white">
              <FontAwesomeIcon icon={faLocationDot} /> {activity.name}{" "}
              {ticket.city} Biletleri
            </h4>
            {ticket.seances.map((seance) => {
              return (
                <div
                  className="py-5 border-b border-b-gray-200 flex md:flex-row flex-col justify-between gap-4"
                  key={uuidv4()}
                >
                  <div className="flex gap-5">
                    <div className="rounded-lg px-2 py-1 border border-gray-200 flex flex-col items-center justify-center">
                      <p className="text-sm dark:text-white">
                        {new Date(seance.startDate).toLocaleDateString(
                          "tr-TR",
                          {
                            month: "short",
                          }
                        )}
                      </p>
                      <p className="text-2xl font-bold dark:text-cornflower-blue-500">
                        {new Date(seance.startDate).toLocaleDateString(
                          "tr-TR",
                          {
                            day: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-semibold dark:text-white">
                        {new Date(seance.startDate).toLocaleDateString(
                          "tr-TR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        {" , "}
                        {new Date(seance.startDate).toLocaleTimeString(
                          "tr-TR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </h2>
                      <p className="flex gap-2 items-center hover:cursor-pointer group">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="dark:text-white group-hover:dark:text-cornflower-blue-200 group-hover:text-cornflower-blue-500"
                        />{" "}
                        <span className="dark:text-white group-hover:dark:text-cornflower-blue-200 group-hover:text-cornflower-blue-500">
                          {seance.location.name}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end">
                    {!seance.isSoldOut && !getSeanceBoughtState(seance.id) ? (
                      <div className="relative">
                        <a
                          onClick={() => {
                            setFocusedSeanceUrl(seance.url);
                          }}
                          href={seance.url}
                          target={"_blank"}
                          className={`max-md:w-full text-center uppercase hover:cursor-pointer focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600`}
                        >
                          Biletini Al
                        </a>
                        {focusedSeanceUrl === seance.url && (
                          <ActivitySavePopover
                            clearFocusedSeanceUrl={clearFocusedSeanceUrl}
                            saveFocusedSeanceUrl={() =>
                              saveFocusedSeanceUrl(seance.id)
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <button
                        className={`bg-opacity-30 max-md:w-full text-center hover:cursor-default uppercase focus:outline-none text-white bg-green-600  font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-2`}
                      >
                        {getSeanceBoughtState(seance.id)
                          ? "Bileti zaten aldınız"
                          : "Biletini Al"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </Fragment>
  );
};

export default TheatreTicketsSection;
