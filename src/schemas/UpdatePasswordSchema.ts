import { object, ref, string } from "yup";

// const phoneRegExp = /^[0-9]{10}$/;
// const postalCodeRegExp = /^\d{5}$/

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{6,16}$/;

let UpdatePasswordSchema = object({
  currentPassword: string().required("Mevcut şifrenizi giriniz"),
  newPassword: string()
    .required("Şifre giriniz")
    .min(6, "Şifreniz minimum 6 karakter olmalıdır")
    .max(16, "Şifreniz maximum 16 karakter olmalıdır")
    .matches(
      passwordRegex,
      "Şifreniz en az bir büyük , küçük , özel karakter içermelidir"
    ),
  newPasswordConfirm: string()
    .required("Şifre tekrarını giriniz")
    .oneOf([ref("newPassword")], "Şifreniz uyuşmuyor"),
});

export default UpdatePasswordSchema;
