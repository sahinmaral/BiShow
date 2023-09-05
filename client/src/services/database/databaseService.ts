import { initializeApp } from "firebase/app";
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import Activity from "../../types/Activity";
import ActivityQueryResult from "../../types/ActivityQueryResult";
import {
  mapActivityFromDocumentData,
  mapBoughtTicketFromDocumentData,
} from "../../helpers/firebaseHelper";
import UserDataAfterRegisterUser from "../../types/UserDataAfterRegisterUser";
import BoughtTicketType from "../../types/BoughtTicketType";
import { v4 as uuidv4 } from "uuid";
import BoughtTicketDetailType from "../../types/BoughtTicketDetailType";
import HomepageSlickListDatas from "../../types/HomeSlickListDatas";
import ActivityRatingType from "../../types/ActivityRatingType";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const activityRef = collection(db, "activities");

const getActivityDocsByQuery = (
  query: Query<DocumentData, DocumentData>
): Promise<ActivityQueryResult> => {
  return getDocs(query)
    .then((queryResult) => {
      const mappedData: Activity[] = queryResult.docs.map((doc) => {
        const docObject = doc.data();
        return mapActivityFromDocumentData(docObject);
      });
      return {
        activities: mappedData,
        lastVisibleItem: queryResult.docs[queryResult.docs.length - 1],
      };
    })
    .catch((err) => {
      return err;
    });
};

const getActivities = async () => {
  const activityQuery = query(activityRef, orderBy("id"), limit(20));
  return getActivityDocsByQuery(activityQuery);
};

const getActivitiesByGenreName = async (genreName: string) => {
  const activityQuery = query(
    activityRef,
    where("genre", "==", genreName),
    orderBy("id"),
    limit(6)
  );
  return getActivityDocsByQuery(activityQuery);
};

const loadMoreActivities = async (
  lastVisibleItem: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  const activityQuery = query(
    activityRef,
    orderBy("id"),
    startAfter(lastVisibleItem),
    limit(20)
  );

  return getActivityDocsByQuery(activityQuery);
};

const getActivityById = async (id: string) => {
  const docRef = doc(db, "activities", id);
  const docSnap = await getDoc(docRef);

  return docSnap;
};

const addUserToUserCollection = async (
  userId: string,
  user: UserDataAfterRegisterUser
) => {
  return setDoc(doc(db, "users", userId), user);
};

const getUserById = async (userId: string) => {
  return getDoc(doc(db, "users", userId));
};

const saveBoughtedTicketOfUser = async (boughtTicket: BoughtTicketType) => {
  return setDoc(doc(db, "boughtTickets", uuidv4()), boughtTicket);
};

const getBoughtedTicketOfUserByActivityId = async (
  userId: string,
  activityId: string
) => {
  const ref = collection(db, "boughtTickets");
  const boughtTicketsQuery = query(
    ref,
    where("userId", "==", userId),
    where("activityId", "==", activityId)
  );

  return getDocs(boughtTicketsQuery);
};

const deleteSavedTicket = async (ticket: BoughtTicketType) => {
  const boughtTicketsQuery = query(
    collection(db, "boughtTickets"),
    where("userId", "==", ticket.userId),
    where("activityId", "==", ticket.activityId),
    where("seanceId", "==", ticket.seanceId)
  );

  return getDocs(boughtTicketsQuery).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  });
};

const getDetailBoughtedTicketOfUser = async (
  userId: string
): Promise<Promise<BoughtTicketDetailType>[]> => {
  try {
    const ref = collection(db, "boughtTickets");
    const boughtTicketsQuery = query(ref, where("userId", "==", userId));

    const allBoughtTicketDocs = await getDocs(boughtTicketsQuery);

    return allBoughtTicketDocs.docs.map((ticketDoc) => {
      const ticketData = mapBoughtTicketFromDocumentData(ticketDoc.data());

      const activityDetailQuery = query(
        activityRef,
        where("id", "==", ticketData.activityId)
      );

      return (async () => {
        const activityDetailDocs = await getDocs(activityDetailQuery);

        const activity = mapActivityFromDocumentData(
          activityDetailDocs.docs[0].data()
        );

        const searchedSeance = activity.tickets
          .map((ticket) => ticket.seances)
          .reduce((result, arr) => result.concat(arr), [])
          .find((seance) => seance.id === ticketData.seanceId)!;

        return {
          activity: activity,
          seance: searchedSeance,
        };
      })();
    });
  } catch (error) {
    throw error;
  }
};

const getPopularActivities = async () => {
  //TODO: Baska aktivite turleri gelince refactor edilecek
  const theatreQuery = query(
    activityRef,
    where("activityType", "==", "Tiyatro"),
    orderBy("rating", "desc"),
    limit(10)
  );

  let homepageSlickListDatas: HomepageSlickListDatas = {
    theatres: [],
  };

  return Promise.all([
    getActivityDocsByQuery(theatreQuery).then((result) => {
      homepageSlickListDatas.theatres = result.activities.map((activity) => {
        return {
          title: activity.name,
          redirectUrl: `/tiyatro/${activity.id}`,
          imageUrl: activity.thumbnail,
        };
      });
    }),
  ]).then(() => {
    return homepageSlickListDatas;
  });
};

const updateRatingOfActivity = async (
  activityId: string,
  rating: ActivityRatingType[]
) => {
  const activityQuery = query(
    collection(db, "activities"),
    where("id", "==", activityId)
  );

  return new Promise<void>((resolve, reject) => {
    return getDocs(activityQuery)
      .then((querySnapshot) => {
        return updateDoc(querySnapshot.docs[0].ref, {
          rating: rating,
        }).then(() => {
          resolve();
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateThemeSettingOfUser = async (userId: string, theme: string) => {
  const docRef = doc(db, "users", userId);
  return new Promise<void>((resolve, reject) => {
    return getDoc(docRef)
      .then((querySnapshot) => {
        return updateDoc(querySnapshot.ref, {
          theme: theme,
        }).then(() => {
          resolve();
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  getActivities,
  loadMoreActivities,
  getActivityById,
  getUserById,
  deleteSavedTicket,
  getPopularActivities,
  getDetailBoughtedTicketOfUser,
  saveBoughtedTicketOfUser,
  getActivitiesByGenreName,
  updateRatingOfActivity,
  updateThemeSettingOfUser,
  getBoughtedTicketOfUserByActivityId,
  addUserToUserCollection,
};
