import { FC, Fragment } from "react";
import { ActivityTicketType } from "../types/ActivitiyTicketType";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


type TheatreTicketsSectionProps = {
  tickets: ActivityTicketType[];
  activityName: string;
};

const TheatreTicketsSection: FC<TheatreTicketsSectionProps> = ({
  tickets,
  activityName,
}) => {
  return (
    <Fragment>
      <h1 className="text-2xl font-semibold">
        {activityName} Biletleri ve Fiyatları
      </h1>

      {tickets.map((ticket) => {
        return (
          <div className="rounded-lg w-full shadow-lg p-4" key={uuidv4()}>
            <h2 className="text-2xl font-semibold">{ticket.city}</h2>
            <h4 className="uppercase font-normal">
              {activityName} {ticket.city} Biletleri
            </h4>
            {ticket.seances.map((seance) => {
              return (
                <div
                  className="py-5 border-b border-b-gray-200 flex md:flex-row flex-col justify-between gap-4"
                  key={uuidv4()}
                >
                  <div className="flex gap-5">
                    <div className="rounded-lg px-2 py-1 border border-gray-200 flex flex-col items-center justify-center">
                      <p className="text-sm">
                        {new Date(seance.startDate).toLocaleDateString(
                          "tr-TR",
                          {
                            month: "short",
                          }
                        )}
                      </p>
                      <p className="text-2xl font-bold">
                        {new Date(seance.startDate).toLocaleDateString(
                          "tr-TR",
                          {
                            day: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-semibold">
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
                      <p className="flex gap-2 items-center hover:text-cornflower-blue-500 hover:cursor-pointer">
                        <FontAwesomeIcon icon={faLocationDot} />{" "}
                        <span>{seance.location.name}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <a
                      href={seance.url}
                      target={"_blank"}
                      className="max-md:w-full text-center uppercase hover:cursor-pointer focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-3 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600"
                    >
                      Biletini Al
                    </a>
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
