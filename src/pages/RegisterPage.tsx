import { FC, Fragment } from "react";
import { fetchRegisterUser } from "../services/auth/authService";
import firebaseErrors from "../assets/firebase-errors";
import { Formik } from "formik";
import RegisterUserSchema from "../schemas/RegisterUserSchema";
import RegisterUserType from "../types/RegisterUserType";
import RegisterUserFormFields from "../components/RegisterPageFormFields";
import { addUserToUserCollection } from "../services/database/databaseService";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../context/ToasterProvider";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { setInfoWithMessage,setDangerWithMessage } = useToaster();

  const registerUser = (values: RegisterUserType) => {
    //TODO : addUserToUserCollection fonksiyonu hata verirse authentication uzerinde kaydedilen kullanicinin silinmesi gerekiyor.
    fetchRegisterUser(values.email, values.password)
      .then((fetchRegisterResult) => {
        addUserToUserCollection(fetchRegisterResult.user.uid, {
          firstName: values.firstName,
          lastName: values.lastName.toUpperCase(),
          photoUrl : "",
          email : values.email
        })
          .then(() => {
            setInfoWithMessage("Başarıyla kayıt oldunuz");
            navigate("/giris-yap");
          })
          .catch((error) => {

            const key = error.code as keyof typeof firebaseErrors;
            setDangerWithMessage(firebaseErrors[key]);
          });
      })
      .catch((error) => {
        console.log(error);
        const key = error.code as keyof typeof firebaseErrors;
        setDangerWithMessage(firebaseErrors[key]);
      });
  };

  const initialData: RegisterUserType = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
  };

  return (
    <Fragment>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Yeni hesap oluşturma
          </h2>
        </div>

        <Formik
          initialValues={initialData}
          onSubmit={registerUser}
          validationSchema={RegisterUserSchema}
        >
          <RegisterUserFormFields />
        </Formik>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
