import Activity from "./Activity"
import ActivityFilter from "./ActivityFilter";
import ModalContent from "./ModalContentType";

type AppStateType = {
    activities : Activity[]
    activityFilter: ActivityFilter;
    modalContent : ModalContent
}

export default AppStateType;