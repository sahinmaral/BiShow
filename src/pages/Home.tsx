import { FC, Fragment, useState } from "react";
import SlickList from "../components/SlickList";
import TheatreCardType from "../types/TheatreCardType";

const Home: FC = () => {
  const [tiyatro] = useState<TheatreCardType[]>(
    [
      {
        title: "Gipsy Kings",
        redirectUrl : "/tiyatro/asd",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/12947/qg7akn90sjtlxt3kqble",
      },
      {
        title: "Hauser",
        redirectUrl : "/tiyatro/asd",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-v2-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/categories/254074/6317670",
      },
      {
        title: "Frozen",
        redirectUrl : "/tiyatro/asd",
        imageUrl: "https://img.vggcdn.net/img/cat/1017/1/13.jpg",
      },
      {
        title: "David Garrett",
        redirectUrl : "/tiyatro/asd",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/440204/h3yhfy9foilmucqo72dz",
      },
      {
        title: "Placido Domingo",
        redirectUrl : "/tiyatro/asd",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/3864/cygebpjwpfo2agyivzoh",
      },
      {
        title: "Havasi",
        redirectUrl : "/tiyatro/asd",
        imageUrl: "https://img.vggcdn.net/img/cat/26339/1/13.jpg",
      },
      {
        title: "Il Divo",
        redirectUrl : "/tiyatro/asd",
        imageUrl:
          "https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_280,h_180/performer/82815/fie7acxjpyyhkiziudlb",
      },
      {
        title: "Café Müller",
        redirectUrl : "/tiyatro/asd",
        imageUrl: "https://img.vggcdn.net/img/cat/1013/2/13.jpg",
      },
      {
        title: "Sergey Orlov",
        redirectUrl : "/tiyatro/asd",
        imageUrl: "https://img.vggcdn.net/img/cat/1015/2/13.jpg",
      },
    ].sort((a, b) => a.title.localeCompare(b.title))
  );

  return (
    <Fragment>
      <SlickList mainTitle="Tiyatro" mainRedirectUrl="/tiyatro" data={tiyatro} />
      <SlickList mainTitle="Film" mainRedirectUrl="/film" data={tiyatro} />
      <SlickList mainTitle="Müzik" mainRedirectUrl="/muzik" data={tiyatro} />
      <SlickList mainTitle="Spor" mainRedirectUrl="/spor" data={tiyatro} />
    </Fragment>
  );
};

export default Home;
