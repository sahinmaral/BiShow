import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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

const getLoggedUserIdIfAuthorized = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, resolve with the UID
        const uid = user.uid;
        resolve(uid);
      } else {
        // User is signed out, reject with an error or appropriate message
        //reject(new Error('User is signed out.'));
      }

      // Unsubscribe from the listener to prevent memory leaks
      unsubscribe();
    });
  });
};

const logOutUser = () => {
  return signOut(auth);
};

export { fetchRegisterUser, fetchLoginUser, getLoggedUserIdIfAuthorized,logOutUser };
