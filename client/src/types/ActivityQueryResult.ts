import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import Activity from "./Activity"

type ActivityQueryResult = {
    activities : Activity[];
    lastVisibleItem : QueryDocumentSnapshot<DocumentData, DocumentData>;
}

export default ActivityQueryResult;