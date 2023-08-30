import { FC, Fragment, useMemo } from "react";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";
import FilterActivityModalContent from "./FilterActivityModalContent";
import { getAppState } from "../redux/app/appSlice";
import { useSelector } from "react-redux";

const ModalContent: FC = () => {
  const { modalContent } = useSelector(getAppState);

  const renderComponent = useMemo(() => {
    switch (modalContent.modalType) {
      case ModalContentTypeEnum.FilterActivity:
        return <FilterActivityModalContent modalContent={modalContent} />;
      default:
        return <Fragment />;
    }
  }, [modalContent.modalType,modalContent.datas]);

  return <Fragment>{renderComponent}</Fragment>;
};

export default ModalContent;
