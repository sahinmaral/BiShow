const firebaseErrors = {
  "auth/user-not-found": "Bu emaile sahip kullanıcı bulunamadı",
  "auth/weak-password": "Şifre , en az 6 karakter uzunluğunda olmalıdır",
  "auth/email-already-in-use": "Bu emaile sahip zaten bir kullanıcı var",
  "auth/wrong-password": "Email adresi ya da şifre yanlış",
  "auth/missing-password" : "Şifre giriniz",
  "auth/invalid-email" : "Email adresi geçerli olmalıdır",
  "auth/too-many-requests" : "Birçok başarısız giriş denemesi nedeniyle bu hesaba erişim geçici olarak devre dışı bırakıldı. Şifrenizi sıfırlayarak hemen geri yükleyebilir veya daha sonra tekrar deneyebilirsiniz"
};

export default firebaseErrors;
