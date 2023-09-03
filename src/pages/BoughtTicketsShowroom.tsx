import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../redux/auth/authSlice";
import BoughtTicketDetailType from "../types/BoughtTicketDetailType";
import { getDetailBoughtedTicketOfUser } from "../services/database/databaseService";
import {
  getAppState,
  setErrorMessageOfFetchResult,
  setIsLoadingOfFetchResult,
  setModalContent,
} from "../redux/app/appSlice";
import Loading from "./Loading";
import AlertTypeEnum from "../enums/AlertTypeEnum";
import CustomAlert from "../components/CustomAlert";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";
import BoughtTicketType from "../types/BoughtTicketType";

const BoughTicketsShowroom: FC = () => {
  const { fetchResultAtPage } = useSelector(getAppState);

  const { user } = useSelector(getAuthState);

  const [boughtedTickets, setBoughtedTickets] = useState<
    BoughtTicketDetailType[]
  >([]);

  const dispatch = useDispatch();

  const showVerifyModal = (ticket: BoughtTicketType) => {
    dispatch(
      setModalContent({
        title: "Uyarı",
        mainContent:
          "Seçtiğiniz bilet kaydını silmek istediğinize emin misiniz ?",
        isOpened: true,
        modalType: ModalContentTypeEnum.VerifyDeleteSavedTicket,
        data: JSON.stringify(ticket),
      })
    );
  };

  useEffect(() => {
    if (user !== null) {
      dispatch(setIsLoadingOfFetchResult(true));

      getDetailBoughtedTicketOfUser(user.id)
        .then((allTicketPromise) => {
          const ticketPromises = allTicketPromise.map((ticketPromise) =>
            ticketPromise.then((ticket) => {
              setBoughtedTickets((prevTickets) => [...prevTickets, ticket]);
            })
          );

          Promise.all(ticketPromises)
            .catch((error) => {
              dispatch(setErrorMessageOfFetchResult(error.message));
            })
            .finally(() => {
              dispatch(setIsLoadingOfFetchResult(false));
            });
        })
        .catch((error) => {
          dispatch(setErrorMessageOfFetchResult(error.message));
          dispatch(setIsLoadingOfFetchResult(false));
        });
    }
  }, [user]);


  return (
    //TODO: Eger kullanici bilet silerse ya da bilet kaydederse bunun diger sayfalarda da anlik goruntulenmesi gerekir.
    <Fragment>
      {fetchResultAtPage.isLoading && <Loading />}
      {!fetchResultAtPage.isLoading && fetchResultAtPage.errorMessage && (
        <CustomAlert
          alertType={AlertTypeEnum.Danger}
          message={fetchResultAtPage.errorMessage}
        />
      )}
      {!fetchResultAtPage.isLoading && !fetchResultAtPage.errorMessage && (
        <div className="container mx-auto flex flex-col">
          <h1 className="text-center text-2xl font-semibold my-10">
            Satın aldığım biletler
          </h1>
          {boughtedTickets.length === 0 && <CustomAlert alertType={AlertTypeEnum.Info} message="Şu anlık kaydettiğin herhangi bir biletin yok" />}
          {boughtedTickets.length > 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Etkinlik Adı
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tür
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Seans Tarihi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Konum
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Eylemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boughtedTickets.map((ticket, index) => {
                    if (index % 2 === 0) {
                      return (
                        <tr
                          className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                          key={uuidv4()}
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {ticket.activity.name}
                          </td>
                          <td className="px-6 py-4">{ticket.activity.genre}</td>
                          <td className="px-6 py-4">
                            {new Date(
                              ticket.seance.startDate
                            ).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            {ticket.seance.location.name}
                          </td>
                          <td className="px-6 py-4 flex gap-5">
                            {/* TODO: Farkli aktivitelerde tiyatro yerine farkli tipler yazilacak */}
                            <Link
                              to={`/tiyatro/${ticket.activity.id}`}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Etkinliği Görüntüle
                            </Link>
                            <button
                              onClick={() =>
                                showVerifyModal({
                                  activityId: ticket.activity.id,
                                  seanceId: ticket.seance.id,
                                  userId: user!.id,
                                })
                              }
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Kaydı Sil
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      <tr
                        className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        key={uuidv4()}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {ticket.activity.name}
                        </td>
                        <td className="px-6 py-4">{ticket.activity.genre}</td>
                        <td className="px-6 py-4">
                          {new Date(ticket.seance.startDate).toLocaleDateString(
                            "tr-TR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {ticket.seance.location.name}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`#`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Kaydı Sil
                          </Link>
                        </td>
                      </tr>;
                    }
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default BoughTicketsShowroom;
