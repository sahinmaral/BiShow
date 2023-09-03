import { DocumentData } from "firebase/firestore";
import Activity from "../types/Activity";
import BoughtTicketType from "../types/BoughtTicketType";
import User from "../types/User";

const mapActivityFromDocumentData = (docObject: DocumentData): Activity => {
  return {
    id: docObject.id,
    rating: docObject.rating,
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

const mapUserDetailFromDocumentData = (
  docObject: DocumentData,
  id: string
): User => {
  return {
    id: id,
    firstName: docObject.firstName,
    lastName: docObject.lastName,
    email: docObject.email,
    photoUrl: docObject.photoUrl,
    theme: docObject.theme,
  };
};

const mapBoughtTicketFromDocumentData = (
  docObject: DocumentData
): BoughtTicketType => {
  return {
    userId: docObject.userId,
    activityId: docObject.activityId,
    seanceId: docObject.seanceId,
  };
};

export {
  mapActivityFromDocumentData,
  mapUserDetailFromDocumentData,
  mapBoughtTicketFromDocumentData,
};
