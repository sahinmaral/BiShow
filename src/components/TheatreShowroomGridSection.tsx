import { FC } from "react";
import Activity from "../types/Activity";

import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

type TheatreShowrooGridSectionProps = {
  filteredActivities: Activity[];
};

const TheatreShowroomGridSection: FC<TheatreShowrooGridSectionProps> = ({
  filteredActivities,
}) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 mt-5 gap-5">
      {filteredActivities.map((theatre) => {
        return (
          <Link to={`/tiyatro/${theatre.id}`} key={uuidv4()} className="group">
            <div className="max-w-sm rounded-lg">
              <img className="rounded-lg" src={theatre.thumbnail} />

              <div className="py-5">
                <h5 className="mb-2 md:text-xl text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-purple-heart-500 group-hover:drop-shadow-lg">
                  {theatre.name}
                </h5>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TheatreShowroomGridSection;
