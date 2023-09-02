import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";

type ModalContentType = {
  title: string;
  mainContent? : string;
  isOpened : boolean;
  modalType: ModalContentTypeEnum  | null;
  data: string;
};

export default ModalContentType;
