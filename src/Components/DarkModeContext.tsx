import { createContext, useContext } from "react";

type DarkModeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("useDarkMode must be used within a DarkModeProvider");
  return context;
};
