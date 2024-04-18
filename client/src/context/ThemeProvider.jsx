/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */


import { useContext, createContext, useState, useEffect } from "react";

const themeContext = createContext(undefined);
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("");
  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  
  };
  
  useEffect(() => {
    handleThemeChange();
  }, [mode]);


  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useTheme must be within a themeProvider");
  }
  return context;
}