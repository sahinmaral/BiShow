import { object, ref, string } from "yup";

// const phoneRegExp = /^[0-9]{10}$/;
// const postalCodeRegExp = /^\d{5}$/

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{6,16}$/;

let RegisterUserSchema = object({
  email: string()
    .email("Geçerli bir email giriniz")
    .required("Email adresi giriniz"),
  password: string()
    .required("Şifre giriniz")
    .min(6, "Şifreniz minimum 6 karakter olmalıdır")
    .max(16, "Şifreniz maximum 16 karakter olmalıdır")
    .matches(
      passwordRegex,
      "Şifreniz en az bir büyük , küçük , özel karakter içermelidir"
    ),
  passwordConfirm: string()
    .required("Şifre tekrarını giriniz")
    .oneOf([ref("password")], "Şifreniz uyuşmuyor"),
});

export default RegisterUserSchema;
