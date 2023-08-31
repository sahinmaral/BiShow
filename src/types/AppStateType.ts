import Activity from "./Activity";
import ActivityFilter from "./ActivityFilter";
import FetchResultOfPage from "./FetchResultOfPage";
import ModalContent from "./ModalContentType";

type AppStateType = {
  activities: Activity[];
  activityFilter: ActivityFilter;
  modalContent: ModalContent;
  fetchResultAtPage: FetchResultOfPage;
};

export default AppStateType;
