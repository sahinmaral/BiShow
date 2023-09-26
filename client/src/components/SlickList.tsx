import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import SlickListNextArrow from "./SlickListNextArrow";
import SlickListPrevArrow from "./SlickListPrevArrow";
import ISlickListData from "../interfaces/ISlickListData";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

type SlickListProps = {
  mainTitle: string;
  mainRedirectUrl: string;
  data: ISlickListData[];
};

const SlickList: FC<SlickListProps> = ({
  mainTitle,
  mainRedirectUrl,
  data,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    swipe: false,
    transformEnabled: false,
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

  const [cardDatas, setCardDatas] = useState<ISlickListData[] | number[]>(
    Array.from(Array(10).keys())
  );

  useEffect(() => {
    if (data.length > 0) {
      setCardDatas(data);
    }
  }, [data]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full p-20">
        <div className="flex justify-between sm:flex-row flex-col max-sm:gap-5 items-center m-3">
          <h1 className="md:text-4xl text-xl font-bold dark:text-white">
            {mainTitle}
          </h1>
          <Link
            to={mainRedirectUrl}
            className="font-semibold text-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 dark:text-white"
          >
            tamamını görüntüle
          </Link>
        </div>
        <Slider {...settings}>
          {cardDatas.map((item) => {
            if (typeof item === "number") {
            return (
              <div className="group px-2" key={uuidv4()}>
                <div className="flex justify-center w-full">
                  <div className="rounded-lg bg-gray-300 dark:bg-gray-700 max-sm:w-3/4 w-full h-[280px] flex justify-center items-center animate-pulse">
                    <FontAwesomeIcon
                      icon={faImage}
                      size="2xl"
                      className="dark:text-gray-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center mt-3">
                  <div className="h-2.5 sm:w-3/4 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
                  <div className="h-2.5 sm:w-3/5 w-1/3 bg-gray-200 rounded-full dark:bg-gray-700 mt-3"></div>
                </div>
              </div>
            );
            } else {
              return (
                <Link to={item.redirectUrl} className="group" key={uuidv4()}>
                  <div className="px-2 flex flex-col items-center">
                    <img
                      src={item.imageUrl}
                      className="max-sm:w-3/4 w-full h-[280px] rounded-lg block"
                    />
                    <p className="font-semibold mt-3 text-gray-800 dark:text-white text-center group-hover:text-cornflower-blue-700">
                      {item.title}
                    </p>
                  </div>
                </Link>
              );
            }
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SlickList;
