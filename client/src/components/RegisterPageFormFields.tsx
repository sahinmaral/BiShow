import { useFormikContext } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import RegisterUserType from "../types/RegisterUserType";

const RegisterUserFormFields: FC = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormikContext<RegisterUserType>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email adresi
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {touched.email && errors.email && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </div>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Şifre
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {touched.password && errors.password && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.password}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Şifre Tekrarı
              </label>
            </div>
            <div className="mt-2">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {touched.passwordConfirm && errors.passwordConfirm && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.passwordConfirm}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ad
              </label>
            </div>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {touched.firstName && errors.firstName && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.firstName}
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Soyad
              </label>
            </div>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {touched.lastName && errors.lastName && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.lastName}
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Kayıt ol
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Kayıtlı mısın?{"  "}
        <Link
          to={`/giris-yap`}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Buraya
        </Link>{" "}
        tıklayarak giriş yap
      </p>
    </div>
  );
};

export default RegisterUserFormFields;
