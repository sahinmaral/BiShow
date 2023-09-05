import { FC, ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeContext";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("color-theme") !== null
      ? (localStorage.getItem("color-theme") as string)
      : "light"
  );

  const toggleTheme = () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    localStorage.setItem("color-theme", updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
