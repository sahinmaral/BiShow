import { FC, useCallback } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

type ActivityRatingProps = {
  rating: number;
  focusedPoint: number;
  myRating:number;
  setFocusedPoint: React.Dispatch<React.SetStateAction<number>>;
  handleRateActivity: () => void;
};

const ActivityRating: FC<ActivityRatingProps> = ({
  rating,
  myRating,
  focusedPoint,
  setFocusedPoint,
  handleRateActivity,
}) => {
  const setClassOfStars = useCallback(
    (point: number) => {
      let classOfStar = "hover:cursor-pointer transition-colors duration-3000 ";

      if (focusedPoint >= point + 1) {
        classOfStar = classOfStar.concat("text-yellow-400");
      } else {
        classOfStar = classOfStar.concat("text-gray-400");
      }

      return classOfStar;
    },
    [focusedPoint, rating]
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex">
        {Array.from(Array(10).keys()).map((point) => {
          return (
            <FontAwesomeIcon
              key={uuidv4()}
              onClick={() => {
                handleRateActivity();
              }}
              onMouseEnter={() => {
                setFocusedPoint(point + 1);
              }}
              onMouseLeave={() => {
                setFocusedPoint(myRating);
              }}
              icon={faStar}
              className={setClassOfStars(point)}
            />
          );
        })}
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {rating !== 0 && (
          <span>
            Kullanıcılar ortalama puan olarak 10 üzerinden {rating} verdi
          </span>
        )}

        {rating === 0 && (
          <span>
            Hiç kimse daha puan vermedi. İlk puan veren siz olabilirsiniz.
          </span>
        )}
      </p>
    </div>
  );
};

export default ActivityRating;
