import { FC } from "react";
import {
  fetchLoginUser,
  fetchRegisterUser,
} from "../services/auth/authService";
import firebaseErrors from "../assets/firebase-errors";
import { useToaster } from "../context/ToasterProvider";
import { useNavigate } from "react-router-dom";

const AuthTestPage: FC = () => {
  const { setInfoWithMessage } = useToaster();
  const navigate = useNavigate();

  const loginUser = () => {
    fetchLoginUser("sahin.maral@hotmail.com", "abcd123")
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        const key = error.code as keyof typeof firebaseErrors;
        console.log(firebaseErrors[key]);
      });
  };

  const registerUser = () => {
    fetchRegisterUser("sahin.maral@hotmail.com", "abcd123")
      .then((result) => {
        console.log(result);
        // setInfoWithMessage("Aferin");
        // navigate("/");
      })
      .catch((error) => {
        const key = error.code as keyof typeof firebaseErrors;
        console.log(firebaseErrors[key]);
      });
  };

  return (
    <div>
      <button
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        onClick={() => {
          loginUser();
        }}
      >
        Login
      </button>
      <button
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        onClick={() => {
          registerUser();
        }}
      >
        Register
      </button>
      <button
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        onClick={() => {
          setInfoWithMessage("Aferin");
        }}
      >
        Test
      </button>
    </div>
  );
};

export default AuthTestPage;
