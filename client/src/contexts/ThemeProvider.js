import * as React from "react";
import { useDarkMode } from "../hooks/useDarkMode";

export const ThemeContext = React.createContext("light");

export const ThemeProviderReact = ({ children }) => {
  const [theme, setTheme] = useDarkMode("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
