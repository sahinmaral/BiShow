import { FC, Fragment, useMemo, useState } from "react";
import ActivityRating from "./ActivityRating";

import { useToaster } from "../context/ToasterProvider";
import { useSelector } from "react-redux";
import { getAuthState } from "../redux/auth/authSlice";
import { updateRatingOfActivity } from "../services/database/databaseService";
import Activity from "../types/Activity";

type TheatreDetailTabsProps = {
  activityDetail: Activity;
  setActivityDetail: React.Dispatch<React.SetStateAction<Activity | undefined>>;
};

const TheatreDetailTabs: FC<TheatreDetailTabsProps> = ({
  activityDetail,
  setActivityDetail,
}) => {
  const { user } = useSelector(getAuthState);

  const myRating = useMemo(() => {
    if (user !== null) {
      const foundRating = activityDetail.rating.find(
        (ratingItem) => ratingItem.userId === user.id
      );
      if (foundRating !== undefined) {
        return foundRating.ratingPoint;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }, []);

  const [selectedTab, setSelectedTab] = useState<string>("rating");
  const [focusedPoint, setFocusedPoint] = useState<number>(myRating);

  const { setSuccessWithMessage, setDangerWithMessage } = useToaster();

  const averageRatingPoint = useMemo(() => {
    if (activityDetail.rating.length === 0) return 0;

    return (
      activityDetail.rating
        .map((ratingItem) => ratingItem.ratingPoint)
        .reduce((ratingItem, current) => ratingItem + current, 0) /
      activityDetail.rating.length
    );
  }, [activityDetail]);

  const handleRateActivity = () => {
    if (user !== null) {
      const newRating = [...activityDetail.rating];

      if (
        activityDetail.rating.filter(
          (ratingItem) => ratingItem.userId === user.id
        ).length === 0
      ) {
        newRating.push({
          userId: user.id,
          ratingPoint: focusedPoint,
        });
      } else {
        newRating.filter(
          (ratingItem) => ratingItem.userId === user.id
        )[0].ratingPoint = focusedPoint;
      }

      updateRatingOfActivity(activityDetail.id, newRating)
        .then(() => {
          setActivityDetail({ ...activityDetail, rating: newRating });
          setSuccessWithMessage("Başarıyla puan verdiniz");
        })
        .catch((err) => {
          setDangerWithMessage(JSON.stringify(err));
        });
    } else {
      setDangerWithMessage("Puan verebilmeniz için giriş yapmanız gerekiyor");
    }
  };

  return (
    <Fragment>
      <div className="my-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2" onClick={() => setSelectedTab("description")}>
            <button
              className={`${
                selectedTab !== "description"
                  ? "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  : ""
              } inline-block p-4 border-b-2 rounded-t-lg`}
            >
              Açıklama
            </button>
          </li>
          <li className="mr-2" onClick={() => setSelectedTab("rules")}>
            <button
              className={`${
                selectedTab !== "rules"
                  ? "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  : ""
              } inline-block p-4 border-b-2 rounded-t-lg`}
            >
              Etkinlik Kuralları
            </button>
          </li>
          <li className="mr-2" onClick={() => setSelectedTab("rating")}>
            <button
              className={`${
                selectedTab !== "rating"
                  ? "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  : ""
              } inline-block p-4 border-b-2 rounded-t-lg`}
            >
              Puanlama
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div
          className={`${
            selectedTab !== "description" ? "hidden" : ""
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
        >
          <p
            dangerouslySetInnerHTML={{ __html: activityDetail.description }}
          ></p>
        </div>
        <div
          className={`${
            selectedTab !== "rules" ? "hidden" : ""
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
        >
          <p>
            • Gününde ve saatinde kullanılmayan biletler geçersiz olup, bilet
            bedeli ve hizmet bedeli iadesi ve/ veya değişiklik yapılması mümkün
            değildir. Gün ve saatinde kullanılmayan biletlerin iadesi için
            Biletinial’dan talepte bulunulamaz.
            <br />
            • Biletiniz mücbir sebep ya da etkinliğin iptali haricinde herhangi
            bir sebeple kullanılamayacak ise, en geç etkinlik saatinden 48 saat
            önceye kadar, Biletinial ile irtibata geçmenizi rica ederiz, aksi
            takdirde biletinizin iptal işlemi gerçekleştirilememektedir.
            <br />
            • Organizasyon sahibi kurum ve/veya kuruluşlar konser verilecek
            alanlarda ve/veya konser salonlarında oturum düzeni ve planında
            uygun gördüğü durumlarda yer değişikliği yapma hakkına sahiptir.
            <br />
            • Kullanıcı Biletinial üzerinden satın almış olduğu biletler için
            etkinlik için geçerli olan yaş sınırı kurallarına uyduğunu kabul
            eder. Yaş sınırları için satın alınan biletin etkinlik mekanında
            kimlik ibrazı zorunlu olacaktır.
            <br />
            • Etkinliğe ait indirimli bilet tanımı olması ve indirimli bilet
            seçeneği ile bilet satın alınması durumunda Kullanıcı bu indirimli
            bilete tabi olduğu kabul ve tahaahüt eder. İndirimli biletler için
            satın alınan biletin etkinlik mekanında kimlik ibrazı zorunlu
            olacaktır.
            <br />• Etkinlik saatine geç kalınması durumunda Biletinial
            kullanıcının etkinlik mekanına alınması konusunda hiçbir şekilde
            sorumlu değildir.
          </p>
        </div>
        <div
          className={`${
            selectedTab !== "rating" ? "hidden" : ""
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
        >
          <ActivityRating
            myRating={myRating}
            rating={averageRatingPoint}
            focusedPoint={focusedPoint}
            setFocusedPoint={setFocusedPoint}
            handleRateActivity={handleRateActivity}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default TheatreDetailTabs;
