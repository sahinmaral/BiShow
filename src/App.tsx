import { FC, Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Footer from "./components/Footer";
import TheatreShowroom from "./pages/TheatreShowroom";
import ModalOverlay from "./components/ModalOverlay";
import TheatreDetail from "./pages/TheatreDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {  useSelector } from "react-redux";
import {  getAuthState } from "./redux/auth/authSlice";
import BoughTicketsShowroom from "./pages/BoughtTicketsShowroom";
import ProtectedRoute from "./components/ProtectedRoute";
import { getAppState } from "./redux/app/appSlice";
import { checkUser } from "./services/auth/authService";


const App: FC = () => {

  const {user} = useSelector(getAuthState);
  const {fetchResultAtPage} = useSelector(getAppState);

  useEffect(() => {
    checkUser()
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
            <Route path="/giris-yap" element={<LoginPage />} />
            <Route path="/kayit-ol" element={<RegisterPage />} />
            <Route
              path="/satin-aldigim-biletler"
              element={
              <ProtectedRoute user={user} isLoading={fetchResultAtPage.isLoading}>
                <BoughTicketsShowroom />
              </ProtectedRoute>}
            />
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
