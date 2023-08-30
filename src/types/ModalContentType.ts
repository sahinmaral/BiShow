import ModalContentTypeEnum from "../enums/ModalContentTypeEnum";

type ModalContentType = {
  title: string;
  isOpened : boolean;
  modalType: ModalContentTypeEnum  | null;
  datas : string[]
};

export default ModalContentType;
