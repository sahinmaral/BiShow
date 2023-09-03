import { initializeApp } from "firebase/app";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { store } from "../../redux/store";
import {
  setIsLoadingOfFetchResult,
  setModalContent,
} from "../../redux/app/appSlice";
import { clearUserState, setUser } from "../../redux/auth/authSlice";
import { getUserById } from "../database/databaseService";
import { mapUserDetailFromDocumentData } from "../../helpers/firebaseHelper";

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
          const userData = result.data();

          if (!userData) {
            reject("Document does not exist");
          } else {
            const userDetailed = mapUserDetailFromDocumentData(
              userData,
              result.id
            );

            store.dispatch(setUser(userDetailed));

            resolve();
          }
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
    store.dispatch(
      setModalContent({
        title: "",
        isOpened: false,
        data: "",
        modalType: null,
      })
    );
    store.dispatch(setIsLoadingOfFetchResult(false));
  });
};

const checkAndUpdateUserPassword = (
  currentPassword: string,
  newPassword: string
) => {
  return new Promise<void>((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (currentUser !== null) {
      const credential = EmailAuthProvider.credential(
        currentUser.email!,
        currentPassword
      );

      reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          updatePassword(currentUser, newPassword)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => {
          reject("Mevcut şifreniz yanlış");
        });
    } else {
      reject("Herhangi bir hesap yok");
    }
  });
};

export {
  fetchRegisterUser,
  fetchLoginUser,
  logOutUser,
  checkAndUpdateUserPassword,
};
