import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { store } from "../../redux/store";
import { setIsLoadingOfFetchResult } from "../../redux/app/appSlice";
import { collection, query } from "firebase/firestore";
import { clearUserState, setUser } from "../../redux/auth/authSlice";
import { getUserById } from "../database/databaseService";
import User from "../../types/User";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const fetchRegisterUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const fetchLoginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const checkUser = () => {
  onAuthStateChanged(auth, (userAuth) => {
    if (userAuth) {
      store.dispatch(setIsLoadingOfFetchResult(true));
      setCurrentUser();
    } else {
      store.dispatch(setIsLoadingOfFetchResult(true));
      logOutUser();
    }
  });
};

export const setCurrentUser = () => {
  return new Promise<void>((resolve, reject) => {
    const currentUser = auth.currentUser;
    if (currentUser !== null) {
      getUserById(currentUser.uid as string)
        .then((result) => {
          if (!result.data) {
            reject("Document does not exist");
          }

          const userDetailed = result.data() as User;

          store.dispatch(
            setUser({
              id: currentUser.uid as string,
              firstName: userDetailed.firstName,
              lastName: userDetailed.lastName,
              email: userDetailed.email,
              photoUrl: userDetailed.photoUrl,
            })
          );

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

const logOutUser = () => {
  return signOut(auth).then(() => {
    store.dispatch(clearUserState());
    store.dispatch(setIsLoadingOfFetchResult(false));
  });
};

export { fetchRegisterUser, fetchLoginUser, logOutUser };
