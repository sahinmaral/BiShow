import { object, string } from "yup";

let LoginUserSchema = object({
  email: string()
    .email("Geçerli bir email giriniz")
    .required("Email adresi giriniz"),
  password: string().required("Şifre giriniz"),
});

export default LoginUserSchema;
