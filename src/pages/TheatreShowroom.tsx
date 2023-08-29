import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router-dom";
import TheatreShowroomFilterSection from "../components/TheatreShowroomFilterSection";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const TheatreShowroom: FC = () => {
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
    </div>
  );
};

export default TheatreShowroom;
