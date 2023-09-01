import { DocumentData } from "firebase/firestore";

const mapActivityFromDocumentData = (docObject: DocumentData) => {
  return {
    id: docObject.id,
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

const mapBoughtTicketFromDocumentData = (docObject: DocumentData) => {
  return {
    userId: docObject.userId,
    activityId: docObject.activityId,
    seanceId: docObject.seanceId,
  };
};

export { mapActivityFromDocumentData,mapBoughtTicketFromDocumentData };
