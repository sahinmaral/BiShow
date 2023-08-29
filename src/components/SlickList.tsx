import { FC } from "react";
import Slider from "react-slick";
import SlickListNextArrow from "./SlickListNextArrow";
import SlickListPrevArrow from "./SlickListPrevArrow";
import ISlickListData from "../interfaces/ISlickListData";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

type SlickListProps = {
  mainTitle: string;
  mainRedirectUrl : string;
  data: ISlickListData[];
};

const SlickList: FC<SlickListProps> = ({ mainTitle, mainRedirectUrl,data }) => {
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
        <div className="flex justify-between items-center mx-2">
          <h1 className="text-2xl font-semibold py-4">{mainTitle}</h1>
          <Link
            to={mainRedirectUrl}
            className="font-semibold text-gray-500 hover:text-gray-700"
          >
            view all
          </Link>
        </div>
        <Slider {...settings}>
          {data.map((item, index) => {
            return (
              <Link to={item.redirectUrl} className="group" key={index}>
                <div className="px-2">
                  <img
                    src={item.imageUrl}
                    key={uuidv4()}
                    className="max-sm:w-full h-[150px] object-cover rounded-lg block"
                  />
                  <p className="font-semibold mt-3 text-gray-800 group-hover:text-cornflower-blue-700">{item.title}</p>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SlickList;
