import { useFormikContext } from "formik";
import { FC } from "react";
import UpdatePasswordType from "../types/UpdatePasswordType";

const UpdatePasswordFormFields: FC = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormikContext<UpdatePasswordType>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mevcut şifre
        </label>
        <input
          type="password"
          id="currentPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.currentPassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {touched.currentPassword && errors.currentPassword && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.currentPassword}
          </div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="newPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Yeni şifre
        </label>
        <input
          type="password"
          id="newPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {touched.newPassword && errors.newPassword && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.newPassword}
          </div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="newPasswordConfirm"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Yeni şifre tekrar
        </label>
        <input
          type="password"
          id="newPasswordConfirm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPasswordConfirm}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {touched.newPasswordConfirm && errors.newPasswordConfirm && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.newPasswordConfirm}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Güncelle
      </button>
    </form>
  );
};

export default UpdatePasswordFormFields;
