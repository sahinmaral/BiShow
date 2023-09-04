import { FC, useEffect, useState } from "react";
import Activity from "../types/Activity";
import { getActivitiesByGenreName } from "../services/database/databaseService";
import { Link } from "react-router-dom";

type SameGenreTheatreRecommendationsProps = {
  genreName: string;
};

const SameGenreTheatreRecommendations: FC<
  SameGenreTheatreRecommendationsProps
> = ({ genreName }) => {
  const [theatresThatSameGenre, setTheatresThatSameGenre] = useState<
    Activity[]
  >([]);

  useEffect(() => {
    getActivitiesByGenreName(genreName).then((result) => {
      setTheatresThatSameGenre(result.activities);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-5 dark:text-white">Benzer Etkinlikler</h1>
      <div className="grid grid-rows-1">
        <div className="flex gap-2 max-lg:overflow-x-scroll max-lg:flex-nowrap max-lg:w-full">
          {theatresThatSameGenre.map((theatre) => {
            return (
              <Link
                key={theatre.id}
                to={`/tiyatro/${theatre.id}`}
                className="flex flex-col gap-2 max-lg:min-w-[140px] max-lg:max-w-[140px] group"
              >
                <img src={theatre.thumbnail} className="rounded-lg h-auto" />
                <h3 className="font-bold text-center dark:text-white group-hover:text-purple-heart-500 group-hover:drop-shadow-lg">{theatre.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SameGenreTheatreRecommendations;
