import { FC, Fragment, useEffect, useState } from "react";
import SlickList from "../components/SlickList";
import { Helmet } from "react-helmet-async";
import constants from "../assets/constants";
import HomepageSlickListDatas from "../types/HomeSlickListDatas";
import { getPopularActivities } from "../services/database/databaseService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppState,
  setErrorMessageOfFetchResult,
  setIsLoadingOfFetchResult,
} from "../redux/app/appSlice";
import CustomAlert from "../components/CustomAlert";
import AlertTypeEnum from "../enums/AlertTypeEnum";
import LoadingSlickList from "../components/LoadingSlickList";
import HomepageHeader from "../components/HomepageHeader";

const Home: FC = () => {
  const [slickListDatas, setSlickListDatas] = useState<HomepageSlickListDatas>({
    theatres: [],
  });
  const { fetchResultAtPage } = useSelector(getAppState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoadingOfFetchResult(true));

    getPopularActivities()
      .then((result) => {
        setSlickListDatas(result);
      })
      .catch((error) => {
        dispatch(setErrorMessageOfFetchResult(JSON.stringify(error)));
      })
      .finally(() => {
        dispatch(setIsLoadingOfFetchResult(false));
      });
  }, []);

  //FIXME : Kucuk genisliklerde yuklendigince slick list item aralarinda bayagi bosluk olusuyor
  //FIXME : Genislik ile oynandiginda glitch oluyor

  return (
    <Fragment>
      <Helmet>
        <title>Anasayfa - {constants.APP_MAIN_TITLE}</title>
      </Helmet>
      {fetchResultAtPage.isLoading && (
        <Fragment>
          <HomepageHeader />
          <LoadingSlickList mainTitle="Tiyatro" mainRedirectUrl="/tiyatro" />
        </Fragment>
      )}
      {!fetchResultAtPage.isLoading && fetchResultAtPage.errorMessage && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={fetchResultAtPage.errorMessage}
        />
      )}
      {!fetchResultAtPage.isLoading && !fetchResultAtPage.errorMessage && (
        <Fragment>
          <HomepageHeader />
          <SlickList
            mainTitle="Tiyatro"
            mainRedirectUrl="/tiyatro"
            data={slickListDatas.theatres}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
