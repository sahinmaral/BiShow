import { FC, Fragment, useEffect, useState } from "react";
import SlickList from "../components/SlickList";
import { Helmet } from "react-helmet-async";
import constants from "../assets/constants";
import HomepageSlickListDatas from "../types/HomeSlickListDatas";
import { getPopularActivities } from "../services/database/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { getAppState, setErrorMessageOfFetchResult, setIsLoadingOfFetchResult } from "../redux/app/appSlice";
import CustomAlert from "../components/CustomAlert";
import Loading from "./Loading";
import AlertTypeEnum from "../enums/AlertTypeEnum";

const Home: FC = () => {
  const [slickListDatas, setSlickListDatas] = useState<HomepageSlickListDatas>({
    theatres: [],
  });
  const { fetchResultAtPage } = useSelector(getAppState);
  const dispatch = useDispatch()

  useEffect(() => {
    getPopularActivities().then((result) => {
      setSlickListDatas(result);
    }).catch((error) => {
      dispatch(setErrorMessageOfFetchResult(JSON.stringify(error)))
    }).finally(() => {
      dispatch(setIsLoadingOfFetchResult(false))
    })
  }, []);


  return (
    <Fragment>
      <Helmet>
        <title>{constants.APP_MAIN_TITLE}</title>
      </Helmet>
      {fetchResultAtPage.isLoading && <Loading />}
      {!fetchResultAtPage.isLoading && fetchResultAtPage.errorMessage && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={fetchResultAtPage.errorMessage}
        />
      )}
      {!fetchResultAtPage.isLoading && !fetchResultAtPage.errorMessage && (
        <Fragment>
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
