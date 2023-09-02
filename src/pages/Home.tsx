import { FC, Fragment, useEffect, useState } from "react";
import SlickList from "../components/SlickList";
import { Helmet } from "react-helmet-async";
import constants from "../assets/constants";
import HomepageSlickListDatas from "../types/HomeSlickListDatas";
import { getPopularActivities } from "../services/database/databaseService";

const Home: FC = () => {
  const [slickListDatas, setSlickListDatas] = useState<HomepageSlickListDatas>({
    theatres: [],
  });

  useEffect(() => {
    getPopularActivities().then((result) => {
      setSlickListDatas(result);
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{constants.APP_MAIN_TITLE}</title>
      </Helmet>
      <SlickList
        mainTitle="Tiyatro"
        mainRedirectUrl="/tiyatro"
        data={slickListDatas.theatres}
      />
      {/* <SlickList mainTitle="Film" mainRedirectUrl="/film" data={tiyatro} />
      <SlickList mainTitle="Müzik" mainRedirectUrl="/muzik" data={tiyatro} />
      <SlickList mainTitle="Spor" mainRedirectUrl="/spor" data={tiyatro} /> */}
    </Fragment>
  );
};

export default Home;
