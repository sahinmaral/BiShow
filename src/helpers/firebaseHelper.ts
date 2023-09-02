import { DocumentData } from "firebase/firestore";
import Activity from "../types/Activity";
import BoughtTicketType from "../types/BoughtTicketType";

const mapActivityFromDocumentData = (docObject: DocumentData) : Activity => {
  return {
    id: docObject.id,
    rating:docObject.rating,
    name: docObject.name,
    genre: docObject.genre,
    activityType: docObject.activityType,
    duration: docObject.duration,
    thumbnail: docObject.thumbnail,
    description: docObject.description,
    startingDate: docObject.startingDate,
    endDate: docObject.endDate,
    tickets: docObject.tickets,
  };
};

const mapBoughtTicketFromDocumentData = (docObject: DocumentData) : BoughtTicketType => {
  return {
    userId: docObject.userId,
    activityId: docObject.activityId,
    seanceId: docObject.seanceId,
  };
};

export { mapActivityFromDocumentData,mapBoughtTicketFromDocumentData };
