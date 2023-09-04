import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppState, setModalVisibilityToggle } from "../redux/app/appSlice";
import ModalContent from "./ModalContent";

const ModalOverlay: FC = () => {
  const { modalContent } = useSelector(getAppState);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalVisibilityToggle());

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "auto";
  };

  return (
    <div
      id="modal"
      className={`${
        modalContent.isOpened ? "bg-gray-200 dark:bg-gray-600 dark:bg-opacity-90 bg-opacity-50" : "hidden"
      } fixed top-0 left-0 right-0 z-50 w-full flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      onClick={handleCloseModal}
    >
      <div
        className="relative"
        id="modalOverlay"
        onClick={(event) => event.stopPropagation()}
      >
        <ModalContent />
      </div>
    </div>
  );
};

export default ModalOverlay;
