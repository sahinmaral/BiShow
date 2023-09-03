import { FC, Fragment, useCallback, useMemo } from "react";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";
import FilterActivityModalContent from "./FilterActivityModalContent";
import {
  getAppState,
  setActivityFilter,
  setModalVisibilityToggle,
} from "../redux/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import VerifyDeleteSavedTicketModalContent from "./VerifyDeleteSavedTicketModalContent";
import ThemeChangeModalContent from "./ThemeChangeModalContent";
import { getAuthState, setUser } from "../redux/auth/authSlice";
import { updateThemeSettingOfUser } from "../services/database/databaseService";
import { useToaster } from "../context/ToasterProvider";
import UpdatePasswordModalContent from "./UpdatePasswordModalContent";
import { checkAndUpdateUserPassword } from "../services/auth/authService";
import UpdatePasswordType from "../types/UpdatePasswordType";

const ModalContent: FC = () => {
  const { modalContent, activityFilter } = useSelector(getAppState);
  const { user } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const { setSuccessWithMessage, setDangerWithMessage } = useToaster();

  const updateActivityFilter = (value: string): void => {
    const mapOfActivityFilter = new Map([
      ["Şehir", "city"],
      ["Mekan", "location"],
      ["Tür", "genre"],
      ["Tarih", "startingDate"],
    ]);
    const keyOfActivityFilter = mapOfActivityFilter.get(modalContent.title)!;

    dispatch(
      setActivityFilter({ ...activityFilter, [keyOfActivityFilter]: value })
    );
  };

  const updateTheme = useCallback(
    (value: string) => {
      if (user !== null) {
        updateThemeSettingOfUser(user.id, value).then(() => {
          dispatch(setModalVisibilityToggle());
          dispatch(setUser({ ...user, theme: value }));
          setSuccessWithMessage("Tema başarıyla güncellendi");
        });
      }
    },
    [user]
  );

  const updatePassword = (values: UpdatePasswordType): void => {
    checkAndUpdateUserPassword(values.currentPassword, values.newPassword)
      .then(() => {
        setSuccessWithMessage("Şifre başarıyla güncellendi");
        dispatch(setModalVisibilityToggle());
      })
      .catch((error) => {
        setDangerWithMessage(JSON.stringify(error));
      });
  };

  const renderComponent = useMemo(() => {
    switch (modalContent.modalType) {
      case ModalContentTypeEnum.FilterActivity:
        return (
          <FilterActivityModalContent
            modalContent={modalContent}
            updateActivityFilter={updateActivityFilter}
          />
        );
      case ModalContentTypeEnum.ThemeChange:
        return (
          <ThemeChangeModalContent
            modalContent={modalContent}
            updateTheme={updateTheme}
          />
        );
      case ModalContentTypeEnum.ChangePassword:
        return (
          <UpdatePasswordModalContent
            modalContent={modalContent}
            updatePassword={updatePassword}
          />
        );
      case ModalContentTypeEnum.VerifyDeleteSavedTicket:
        return (
          <VerifyDeleteSavedTicketModalContent modalContent={modalContent} />
        );
      default:
        return <Fragment />;
    }
  }, [modalContent.modalType, modalContent.data]);

  return <Fragment>{renderComponent}</Fragment>;
};

export default ModalContent;
