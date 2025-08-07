import { FaHeart, FaMoon, FaSun, FaTachometerAlt } from "react-icons/fa";
import { useDarkMode } from "./DarkModeContext";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <a href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
            <FaHeart className="text-[#FF9EB5] w-5 h-5" />
          </div>
          <h1 className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>QuizKit</h1>
        </a>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive("/")
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              isActive("/dashboard")
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FaTachometerAlt className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-10 h-10 rounded-full theme-toggle bg-white flex items-center justify-center shadow-lg"
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
