import { FC, Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Footer from "./components/Footer";
import TheatreShowroom from "./pages/TheatreShowroom";
import ModalOverlay from "./components/ModalOverlay";
import TheatreDetail from "./pages/TheatreDetail";
import AuthTestPage from "./pages/AuthTestPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getLoggedUserIdIfAuthorized } from "./services/auth/authService";
import { getUserById } from "./services/database/databaseService";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/auth/authSlice";
import User from "./types/User";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getLoggedUserIdIfAuthorized().then((uid) => {
      getUserById(uid as string).then((doc) => {
        const data = doc.data() as User;

        dispatch(
          setUser({
            id: uid as string,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            photoUrl: data.photoUrl,
          })
        );
      });
    });
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <main className="mb-[100px] relative">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/tiyatro" element={<TheatreShowroom />} />
            <Route path="/tiyatro/:id" element={<TheatreDetail />} />
            <Route path="/auth" element={<AuthTestPage />} />
            <Route path="/giris-yap" element={<LoginPage />} />
            <Route path="/kayit-ol" element={<RegisterPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>

      <ModalOverlay />
    </Fragment>
  );
};

export default App;
