import { FC, useState } from "react";
import Slider from "react-slick";
import SlickListNextArrow from "./SlickListNextArrow";
import SlickListPrevArrow from "./SlickListPrevArrow";

type TheatreCardType = {
  title: string;
  imageUrl: string;
};

const SlickList: FC = () => {
  const [theatres] = useState<TheatreCardType[]>(
    [
      {
        title: "Gipsy Kings",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/12947/qg7akn90sjtlxt3kqble",
      },
      {
        title: "Hauser",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-v2-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/categories/254074/6317670",
      },
      {
        title: "Frozen",
        imageUrl: "https://img.vggcdn.net/img/cat/1017/1/13.jpg",
      },
      {
        title: "David Garrett",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/440204/h3yhfy9foilmucqo72dz",
      },
      {
        title: "Placido Domingo",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/3864/cygebpjwpfo2agyivzoh",
      },
      {
        title: "Havasi",
        imageUrl: "https://img.vggcdn.net/img/cat/26339/1/13.jpg",
      },
      {
        title: "Il Divo",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/82815/fie7acxjpyyhkiziudlb",
      },
      {
        title: "Café Müller",
        imageUrl: "https://img.vggcdn.net/img/cat/1013/2/13.jpg",
      },
      {
        title: "Sergey Orlov",
        imageUrl: "https://img.vggcdn.net/img/cat/1015/2/13.jpg",
      },
    ].sort((a, b) => a.title.localeCompare(b.title))
  );

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
        <h2 className="text-2xl font-bold py-4">Theatres</h2>
        <Slider {...settings}>
          {theatres.map((theatre, index) => {
            return (
              <div className="px-2" key={index}>
                <img
                  src={theatre.imageUrl}
                  className="max-sm:w-full h-[150px] object-cover rounded-lg block"
                />
                <p className="font-semibold mt-3">{theatre.title}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SlickList;
