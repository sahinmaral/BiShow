import { createContext } from "react";
import ThemeContextType from "../types/ThemeContextType";

export const ThemeContext = createContext<ThemeContextType>({
  theme:
    localStorage.getItem("color-theme") !== null
      ? (localStorage.getItem("color-theme") as string)
      : "light",
  toggleTheme: () => {},
});
