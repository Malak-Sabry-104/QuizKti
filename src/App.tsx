import { useState, useEffect, type ReactNode } from "react";
import { DarkModeContext } from "./Components/DarkModeContext";

type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => {
  // Initialize darkMode state from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-[#ff9eb5] to-[#8cb9e8] text-gray-900"
        }`}
      >
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

export default App;
