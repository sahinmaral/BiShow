import { useFormikContext } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import LoginUserType from "../types/LoginUserType";

const LoginUserFormFields: FC = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormikContext<LoginUserType>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={onSubmit}>
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
              className="block w-full rounded-md border-0 py-1.5  ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {touched.email && errors.email && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </div>
          )}
        </div>

        <div className="my-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Şifre
            </label>
            <div className="text-sm">
            {/* TODO: Şifre unutma olayı yap */}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Şifreni mi unuttun?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="block w-full rounded-md border-0 py-1.5  ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {touched.password && errors.password && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.password}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Giriş yap
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Kayıtlı değil misin?{"  "}
        <Link
          to={`/kayit-ol`}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Buraya
        </Link>{" "}
        tıklayarak kaydol
      </p>
    </div>
  );
};

export default LoginUserFormFields;
