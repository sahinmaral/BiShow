// import { initializeApp } from "firebase/app";
// import { child, get, getDatabase, ref } from "firebase/database";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_FIREBASE_APPID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
//   databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);

// const getActivities = () => {
//   const dbRef = ref(database);
//   return get(child(dbRef, `activities`))
// };

// export {getActivities}

import { initializeApp } from "firebase/app";
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import Activity from "../../types/Activity";
import ActivityQueryResult from "../../types/ActivityQueryResult";
import { mapActivityFromDocumentData } from "../../helpers/firebaseHelper";
import UserDataAfterRegisterUser from "../../types/UserDataAfterRegisterUser";
import BoughtTicketType from "../../types/BoughtTicketType";
import { v4 as uuidv4 } from "uuid";

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

const getBoughtedTicketOfUser = async (userId: string, activityId: string) => {
  const ref = collection(db, "boughtTickets");
  const boughtTicketsQuery = query(ref, where("userId", "==", userId),where("activityId", "==", activityId));

  return getDocs(boughtTicketsQuery);
};

export {
  getActivities,
  loadMoreActivities,
  getActivityById,
  getUserById,
  saveBoughtedTicketOfUser,
  getActivitiesByGenreName,
  getBoughtedTicketOfUser,
  addUserToUserCollection,
};
