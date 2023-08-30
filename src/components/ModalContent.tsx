import { FC, Fragment, useMemo } from "react";
import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";
import FilterActivityModalContent from "./FilterActivityModalContent";
import { getAppState, setActivityFilter } from "../redux/app/appSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalContent: FC = () => {
  const { modalContent, activityFilter } = useSelector(getAppState);
  const dispatch = useDispatch();

  const updateActivityFilter = (value: string): void => {
    const mapOfActivityFilter = new Map([
      ["Şehir", "city"],
      ["Mekan", "location"],
      ["Tür", "genre"],
      ["Tarih", "startingDate"],
    ])
    const keyOfActivityFilter = mapOfActivityFilter.get(modalContent.title)!;

    dispatch(
      setActivityFilter({ ...activityFilter, [keyOfActivityFilter]: value })
    );
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
      default:
        return <Fragment />;
    }
  }, [modalContent.modalType, modalContent.datas]);

  return <Fragment>{renderComponent}</Fragment>;
};

export default ModalContent;
