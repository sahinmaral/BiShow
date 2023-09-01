import { FC, Fragment } from "react";
import { fetchLoginUser } from "../services/auth/authService";
import firebaseErrors from "../assets/firebase-errors";
import LoginUserFormFields from "../components/LoginUserFormFields";
import LoginUserType from "../types/LoginUserType";
import { Formik } from "formik";
import LoginUserSchema from "../schemas/LoginUserSchema";
import { useToaster } from "../context/ToasterProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById } from "../services/database/databaseService";
import { setUser } from "../redux/auth/authSlice";
import User from "../types/User";

const LoginPage: FC = () => {
  const { setSuccessWithMessage, setDangerWithMessage } = useToaster();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = (values: LoginUserType) => {
    fetchLoginUser(values.email, values.password)
      .then((result) => {
        const id = result.user.uid;
        return id;
      })
      .then((id) => {
        getUserById(id).then((doc) => {
          const data = doc.data() as User;
          dispatch(
            setUser({
              id: id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              photoUrl: data.photoUrl,
            })
          );
          setSuccessWithMessage("Hoşgeldiniz");
          navigate("/");
        });
      })
      .catch((error) => {
        const key = error.code as keyof typeof firebaseErrors;
        setDangerWithMessage(firebaseErrors[key]);
      });
  };

  const initialData: LoginUserType = {
    email: "",
    password: "",
  };

  return (
    <Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hesabına giriş yap
          </h2>
        </div>

        <Formik
          initialValues={initialData}
          onSubmit={loginUser}
          validationSchema={LoginUserSchema}
        >
          <LoginUserFormFields />
        </Formik>
      </div>
    </Fragment>
  );
};

export default LoginPage;
