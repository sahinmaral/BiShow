import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import ThemeProvider from "./context/ThemeProvider.tsx";
import ToasterProvider from "./context/ToasterProvider.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider>
      <ToasterProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToasterProvider>
    </ThemeProvider>
  </HelmetProvider>
);
