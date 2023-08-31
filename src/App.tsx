import { FC, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Footer from "./components/Footer";
import TheatreShowroom from "./pages/TheatreShowroom";
import ModalOverlay from "./components/ModalOverlay";
import TheatreDetail from "./pages/TheatreDetail";

const App: FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <main className="mb-[100px]">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/tiyatro" element={<TheatreShowroom />} />
            <Route path="/tiyatro/:id" element={<TheatreDetail />} />
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
