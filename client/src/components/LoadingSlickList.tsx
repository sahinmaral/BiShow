import { FC } from "react";
import Slider from "react-slick";
import SlickListNextArrow from "./SlickListNextArrow";
import SlickListPrevArrow from "./SlickListPrevArrow";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

type SlickListProps = {
  mainTitle: string;
  mainRedirectUrl: string;
};

const LoadingSlickList: FC<SlickListProps> = ({
  mainTitle,
  mainRedirectUrl,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    swipe: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: <SlickListPrevArrow />,
    nextArrow: <SlickListNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <div className="xl:w-[1200px] lg:w-[1000px] md:w-[700px] sm:w-[500px] w-[300px]">
        <div className="flex justify-between sm:flex-row flex-col max-sm:gap-5 items-center m-3">
          <h1 className="text-4xl font-bold dark:text-white">{mainTitle}</h1>
          <Link
            to={mainRedirectUrl}
            className="font-semibold text-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 dark:text-white"
          >
            tamamını görüntüle
          </Link>
        </div>
        <Slider {...settings}>
          {Array.from(Array(10).keys()).map(() => {
            return (
              <div className="group px-2" key={uuidv4()}>
                <div className="rounded-lg bg-gray-300 dark:bg-gray-700 w-[210px] h-[280px] flex justify-center items-center animate-pulse">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2xl"
                    className="dark:text-gray-600"
                  />
                </div>
                <div className="mt-[2.5em] flex flex-col items-center">
                  <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
                  <div className="h-2.5 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default LoadingSlickList;
