import { FC, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisibilityToggle } from "../redux/app/appSlice";
import { useToaster } from "../context/ToasterProvider";
import BoughtTicketType from "../types/BoughtTicketType";
import { deleteSavedTicket } from "../services/database/databaseService";
import ModalContentType from "../types/ModalContentType";

type VerifyDeleteSavedTicketModalContentProps = {
  modalContent: ModalContentType;
};

const VerifyDeleteSavedTicketModalContent: FC<
  VerifyDeleteSavedTicketModalContentProps
> = ({ modalContent }) => {
  const dispatch = useDispatch();
  const { setSuccessWithMessage, setDangerWithMessage } = useToaster();

  const handleCloseModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setModalVisibilityToggle());

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "auto";
  };

  const handleDeleteSavedTicket = () => {
    const ticket = JSON.parse(modalContent.data) as BoughtTicketType;

    deleteSavedTicket(ticket)
      .then(() => {
        setSuccessWithMessage("Kaydettiğiniz bilet başarıyla silindi");
        dispatch(setModalVisibilityToggle())
      })
      .catch((error) => {
        setDangerWithMessage(error);
      });
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[400px]">
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {modalContent.title}
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={(event) => handleCloseModal(event)}
        >
          <FontAwesomeIcon icon={faClose} />
          <span className="sr-only">Close modal</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {modalContent.mainContent}
        <div className="flex gap-5 justify-center">
          <button
            type="button"
            onClick={() => handleDeleteSavedTicket()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Evet
          </button>
          <button
            type="button"
            onClick={() => dispatch(setModalVisibilityToggle())}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDeleteSavedTicketModalContent;
