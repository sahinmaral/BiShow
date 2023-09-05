import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

import { v4 as uuidv4 } from "uuid";

const TheatreShowroomLoadingGridSection: FC = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 mt-5 gap-5">
      {Array.from(Array(8).keys()).map(() => {
        return (
          <div key={uuidv4()} className="group">
            <div className="max-w-sm rounded-lg">
              <div className="rounded-lg bg-gray-300 dark:bg-gray-700 max-w-[600px] aspect-[3/4] flex justify-center items-center animate-pulse">
                <FontAwesomeIcon
                  icon={faImage}
                  size="2xl"
                  className="dark:text-gray-600"
                />
              </div>

              <div className="py-5">
                <div className="m-0 p-0 flex flex-col">
                  <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="h-2.5 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TheatreShowroomLoadingGridSection;
