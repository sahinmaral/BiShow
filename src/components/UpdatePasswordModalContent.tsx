import { FC, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ModalContent from "../types/ModalContentType";
import { useDispatch } from "react-redux";
import { setModalVisibilityToggle } from "../redux/app/appSlice";
import { Formik } from "formik";
import UpdatePasswordType from "../types/UpdatePasswordType";
import UpdatePasswordSchema from "../schemas/UpdatePasswordSchema";
import UpdatePasswordFormFields from "./UpdatePasswordFormFields";

type ThemeChangeModalContentProps = {
  modalContent: ModalContent;
  updatePassword : (values: UpdatePasswordType) => void;
};

const UpdatePasswordModalContent: FC<ThemeChangeModalContentProps> = ({
  modalContent,
  updatePassword
}) => {
  const dispatch = useDispatch();

  const handleCloseModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(setModalVisibilityToggle());

    const targetElement = document.querySelector("html, body") as HTMLElement;
    targetElement.style.overflow = "auto";
  };

  const initialData = {
    currentPassword : "",
    newPassword: "",
    newPasswordConfirm: ""
  }

  //TODO : Aynı şifreyi tekrar yazarsa hata mesajı gönderebiliriz

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
      <Formik
          initialValues={initialData}
          onSubmit={updatePassword}
          validationSchema={UpdatePasswordSchema}
        >
          <UpdatePasswordFormFields />
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePasswordModalContent;
