import { FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "./DarkModeContext";

const NavBar = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
          <FaHeart className="text-[#FF9EB5] w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold dark:text-white">QuizKit</h1>
      </a>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 w-5 h-5" />
        ) : (
          <FaMoon className="text-[#8CB9E8] w-5 h-5" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
