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
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Activity from "../../types/Activity";
import ActivityQueryResult from "../../types/ActivityQueryResult";

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

const getActivityDocsByQuery = (query: Query<DocumentData, DocumentData>) : Promise<ActivityQueryResult> => {
  return getDocs(query)
    .then((queryResult) => {
      const mappedData: Activity[] = queryResult.docs.map((doc) => {
        const docObject = doc.data();
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
          tickets:docObject.tickets
        };
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

export { getActivities, loadMoreActivities };
